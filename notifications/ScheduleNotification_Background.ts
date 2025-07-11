// tasks/scheduleNotificationsTask.ts
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { getTomorrowSchedule, getEndTimeAsDate } from '../database/operation';

const TASK_SCHEDULE_NOTIFICATIONS = 'TASK_SCHEDULE_NOTIFICATIONS';

TaskManager.defineTask(TASK_SCHEDULE_NOTIFICATIONS, async () => {
  const classes = await getTomorrowSchedule();
  for (const classItem of classes) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Class Over: ${classItem.subject_code}`,
        body: `Your class ${classItem.subject_code} has ended.`,
        data: { subject_code: classItem.subject_code },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: getEndTimeAsDate(classItem.end_time, /*tomorrow=*/),
      },
    });
  }

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export const registerScheduleNotificationsTask = async () => {
  await BackgroundFetch.registerTaskAsync(TASK_SCHEDULE_NOTIFICATIONS, {
    minimumInterval: 60 * 60 * 24, // Daily
    stopOnTerminate: false,
    startOnBoot: true,
  });
};
