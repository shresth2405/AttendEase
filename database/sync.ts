import { Subject } from "./types";
import { getDB } from "./initDB";
import { Schedule, History } from "./types";
import { markHistoryAsSynced, markSubjectAsSynced } from "./operation";


export const getUnsyncedSubjects = async (): Promise<Subject[]> => {
  const db = getDB();
  try {
    const unsyncedSubjects = await db.getAllAsync(
      `SELECT * FROM subjects WHERE synced = 0`
    ) as Subject[];
    return unsyncedSubjects;
  } catch (error) {
    console.error('Failed to fetch unsynced subjects:', error);
    throw error;
  }
};
export const getUnsyncedHistory = async (): Promise<History[]> => {
  const db = getDB();
  try {
    const unsyncedHistory = await db.getAllAsync(
      `SELECT * FROM history WHERE synced = 0`
    ) as History[];
    return unsyncedHistory;
  } catch (error) {
    console.error('Failed to fetch unsynced subjects:', error);
    throw error;
  }
};
export const getSchedule = async (): Promise<Schedule[]> => {
  const db = getDB();
  try {
    const Schedule = await db.getAllAsync(
      `SELECT * FROM schedule`
    ) as Schedule[];
    return Schedule;
  } catch (error) {
    console.error('Failed to fetch unsynced schedule:', error);
    throw error;
  }
};


export const syncSubject = async()=>{
  const subject = await getUnsyncedSubjects() as Subject[];
  try{

    const response = await fetch("https://attendease-backend-mtdj.onrender.com/api/subject/sync",{
      method: "POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(subject)
    })

    const result = await response.json();

    for(const item of subject){
      await markSubjectAsSynced(item.code);
    }
  }catch(e){
    console.error("Error:",e);
    throw e;
  }
}


export const syncHistory = async()=>{
  const history = await getUnsyncedHistory() as History[];
  console.log(history);
  try{
    const response = await fetch("https://attendease-backend-mtdj.onrender.com/api/history/sync",{
      method: "POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(history)
    })

    const result = await response.json();
    console.log(result);

    for(const item of history){
      await markHistoryAsSynced(item.id);
    }
  }catch(e){
    console.error("Error:",e);
    throw e;
  }
}
export const syncSchedule = async()=>{
  const history = await getSchedule() as Schedule[];
  try{
    const response = await fetch("https://attendease-backend-mtdj.onrender.com/api/schedule/sync",{
      method: "POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(history)
    })

    const result = await response.json();
    console.log(result);
  }catch(e){
    console.error("Error:",e);
    throw e;
  }
}