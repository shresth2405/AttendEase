import * as SQLite from 'expo-sqlite';

import { getDB } from './initDB'
import { Subject, ScheduleEntry, HistoryEntry, Schedule, SubjectWithSchedules} from './types'

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




export const addHistoryEntry = async (entry: HistoryEntry) => {
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

