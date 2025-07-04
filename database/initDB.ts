import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase;

export const initDB = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabaseAsync('attendance.db');

    await db.execAsync(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT NOT NULL UNIQUE,
        teacher TEXT,
        total_classes INTEGER DEFAULT 0,
        present INTEGER DEFAULT 0,
        percentage REAL DEFAULT 0.0,
        createdAt TEXT DEFAULT (datetime('now','localtime'))
      );

      CREATE TABLE IF NOT EXISTS schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        subject_code TEXT NOT NULL,
        createdAt TEXT DEFAULT (datetime('now','localtime')),
        FOREIGN KEY (subject_code) REFERENCES subjects (code) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_code TEXT NOT NULL,
        date TEXT NOT NULL,
		status TEXT DEFAULT 'Absent',
        createdAt TEXT DEFAULT (datetime('now','localtime')),
        FOREIGN KEY (subject_code) REFERENCES subjects (code) ON DELETE CASCADE
      );
    `);
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database is not initialized. Call initDB() first.');
  }
  return db;
};
