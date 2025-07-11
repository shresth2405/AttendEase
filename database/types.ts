export interface Subject{
  id?:number;
  name: string;
  code: string;
  teacher: string;
  total_classes?: number;
  present?: number;
};

export interface ScheduleEntry{
  day: string;          // e.g., 'Monday'
  start_time: string;   // e.g., '09:00'
  end_time: string;     // e.g., '10:00'
  subject_code: string; // Must match subject's code
};

export interface History {
  id: number
  subject_code: string;
  date: string; // e.g., '2025-07-03'
  status: 'Present' | 'Absent';
  synced?: number,
  createdAt?: string
};

export interface Class {
  subject_code: string;
  date: string; 
};



export interface Schedule {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  subject_code: string;
  synced?: number,
  createdAt: string;
}

export interface SubjectWithSchedules extends Subject {
  schedules: Schedule[];
}