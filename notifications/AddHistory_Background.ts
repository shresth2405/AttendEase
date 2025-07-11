// tasks/historyRecoveryTask.ts
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { getTodaySchedule, getEndTimeAsDate, addClasstoHistory, checkHistory } from '../database/operation';

const TASK_HISTORY_RECOVERY = 'TASK_HISTORY_RECOVERY';

TaskManager.defineTask(TASK_HISTORY_RECOVERY, async () => {
  const classes = await getTodaySchedule();
  const now = new Date();

  for (const classItem of classes) {
    const endTime = getEndTimeAsDate(classItem.end_time);
    const alreadyLogged = await checkHistory(classItem.subject_code, endTime);
    if (now >= endTime && !alreadyLogged) {
      await addClasstoHistory({ subject_code: classItem.subject_code, date: endTime.toISOString() });
      console.log(`Recovered missed history for ${classItem.subject_code}`);
    }
    console.log("History added");
  }

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export const registerHistoryRecoveryTask = async () => {
  await BackgroundFetch.registerTaskAsync(TASK_HISTORY_RECOVERY, {
    minimumInterval: 60 * 60, // Every hour
    stopOnTerminate: false,
    startOnBoot: true,
  });
};
