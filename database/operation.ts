import * as SQLite from 'expo-sqlite';
import { getDB } from './initDB'
import { Subject, ScheduleEntry, History, Schedule, SubjectWithSchedules, Class} from './types'

export const addSubject = async (subject: Subject) => {
    const db = getDB();
    try {
        await db.runAsync(
            `INSERT INTO subjects(name,code, teacher, total_classes, present) VALUES(?,?,?,?,?)`,
            [
                subject.name,
                subject.code,
                subject.teacher,
                subject.total_classes || 0,
                subject.present || 0
            ]
        );
        console.log('Subject added successfully');
    }catch(err){
        console.error('Failed to add subject', err);
        throw err;
    }
}
export const addClasstoHistory = async ( {subject_code, date }:Class) => {
    const db = getDB();
    try {
        await db.runAsync(
            `INSERT INTO history(subject_code, date) VALUES(?,?)`,
            [
                subject_code,
                date,
            ]
        );
        console.log('Subject added successfully');
    }catch(err){
        console.error('Failed to add subject', err);
        throw err;
    }
}



export const addScheduleEntry = async (entry: ScheduleEntry) => {
  const db = getDB();
  try {
    await db.runAsync(
      `INSERT INTO schedule (day, start_time, end_time, subject_code) VALUES (?, ?, ?, ?)`,
      [entry.day, entry.start_time, entry.end_time, entry.subject_code]
    );
    console.log('Schedule entry added successfully');
  } catch (error) {
    console.error('Failed to add schedule entry:', error);
    throw error;
  }
};

export const getSubjectsWithSchedules = async (): Promise<SubjectWithSchedules[]> => {
  const db = getDB();
  try {
    const subjects = await db.getAllAsync(`SELECT * FROM subjects`) as Subject[];
    const result: SubjectWithSchedules[] = [];
    for (const subject of subjects) {
      const schedules = await db.getAllAsync(
        `SELECT * FROM schedule WHERE subject_code = ?`,
        [subject.code]
      ) as Schedule[];
      result.push({...subject, schedules});
    }
    return result;
  } catch (error) {
    console.error('Failed to fetch subjects and schedules:', error);
    throw error;
  }
};

export const updateSubjectPercentage = async (subjectCode: string) => {
  const db = getDB();
  try {
    interface SubjectStats {
    total_classes: number;
    present: number;
    }
    const subject = await db.getFirstAsync(
      `SELECT total_classes, present FROM subjects WHERE code = ?`,
      [subjectCode]
    ) as SubjectStats | undefined;

    if (subject) {
      const percentage =
        subject.total_classes > 0
          ? (subject.present / subject.total_classes) * 100
          : 0.0;

      await db.runAsync(
        `UPDATE subjects SET percentage = ? WHERE code = ?`,
        [percentage, subjectCode]
      );
    }
  } catch (error) {
    console.error('Failed to update subject percentage:', error);
    throw error;
  }
};




export const addHistoryEntry = async (entry: History) => {
  const db = getDB();
  try {
    await db.runAsync(
      `INSERT INTO history (subject_code, date, status) VALUES (?, ?, ?)`,
      [entry.subject_code, entry.date, entry.status]
    );

    // Update total_classes
    await db.runAsync(
      `UPDATE subjects SET total_classes = total_classes + 1 WHERE code = ?`,
      [entry.subject_code]
    );

    // Update present if status == Present
    if (entry.status === 'Present') {
      await db.runAsync(
        `UPDATE subjects SET present = present + 1 WHERE code = ?`,
        [entry.subject_code]
      );
    }

    // Recalculate percentage
    await updateSubjectPercentage(entry.subject_code);

    console.log('History entry added successfully');
  } catch (error) {
    console.error('Failed to add history entry:', error);
    throw error;
  }
};

export const getScheduleEntries = async () => {
  const db = getDB();
  return await db.getAllAsync(`
    SELECT s.day, s.start_time, s.end_time, s.subject_code, subjects.name, subjects.teacher
    FROM schedule s
    JOIN subjects ON s.subject_code = subjects.code
  `);
};


export const getAllSubjects = async () => {
  const db = getDB();
  const subjects = await db.getAllAsync('SELECT * FROM subjects');
  return subjects as { name: string; code: string; teacher: string }[];
};

export const deleteAllSubjects = async () => {
  const db = getDB();
  await db.execAsync('DELETE FROM subjects');
};

export const markHistoryAsSynced = async (id: number) => {
  const db = getDB();
  try {
    await db.runAsync(
      'UPDATE history SET synced = 1 WHERE id = ?',[id]
    );
  } catch (err) {
    console.error('Failed to update history sync status', err);
  }
};
export const markSubjectAsSynced = async (code: string) => {
  const db = getDB();
  try {
    await db.runAsync(
      'UPDATE subjects SET synced = 1 WHERE code = ?',[code]
    );
  } catch (err) {
    console.error('Failed to update subject sync status', err);
  }
};

export const unmarkedClass = async()=>{
  const db = getDB();
  try{
    const classes = await db.getAllAsync('SELECT * FROM history WHERE status = Unmarked') as History[];
    return classes;
  }catch(e){
    console.error("Failed to get Unmarked classes");
  }
}

export const markClassPresent = async(id: number)=>{
  const db = getDB();
  try{
    await db.runAsync(
      'UPDATE history SET status = Present WHERE id=?',[id]
    );
  }catch(err){
    console.error('Failed to mark Class');
  }
}
export const markClassAbsent = async(id: number)=>{
  const db = getDB();
  try{
    await db.runAsync(
      'UPDATE history SET status = Absent WHERE id=?',[id]
    );
  }catch(err){
    console.error('Failed to mark Class');
  }
}
export const getTodaySchedule = async () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayDay = days[new Date().getDay()];
  // console.log(todayDay);
  const db = getDB();
  const result = await db.getAllAsync(
    'SELECT * FROM schedule WHERE day = ?',[todayDay]
  ) as Schedule[];
  return result;
};

export const getTomorrowSchedule = async () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const tomorrowDay = days[(today.getDay() + 1) % 7];
  // console.log(todayDay);
  const db = getDB();
  const result = await db.getAllAsync(
    'SELECT * FROM schedule WHERE day = ?',[tomorrowDay]
  ) as Schedule[];
  return result;
};

export function getEndTimeAsDate(endTime: string): Date {
  const [hourStr, minuteStr] = endTime.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const now = new Date();
  now.setHours(hour, minute, 0, 0); // hour, minute, seconds, milliseconds

  return now;
}

export const checkHistory = async (subject_code: string, endTime: Date) => {
  const db = getDB();
  const date = endTime.toISOString().split('T')[0];  // e.g., "2025-07-10"

  const query = `
    SELECT * FROM history 
    WHERE subject_code = ? AND DATE(timestamp) = ?
  `;

  const result = await db.getAllAsync(query, [subject_code, date]);

  return result.length > 0;  // true if already logged
};






