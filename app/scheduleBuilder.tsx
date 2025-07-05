import React, { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Notifications from 'expo-notifications';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSubjectsWithSchedules, addScheduleEntry, getScheduleEntries } from '../database/operation';

interface SubjectType {
  name: string;
  code: string;
  teacher: string;
}
interface ScheduleEntry {
  day: string;
  start_time: string;
  end_time: string;
  subject_code: string;
  name: string;
  teacher: string;
}


export default function ScheduleBuilderPage() {
  const [subjects, setSubjects] = useState<SubjectType[]>([]);

  const [routineGrid, setRoutineGrid] = useState<(SubjectType | null)[][]>(
    Array(5).fill(null).map(() => Array(9).fill(null))
  );

  const [dragged, setDragged] = useState<SubjectType | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const timeSlots = ['9-10', '10-11', '11-12', '12-1', '1-2', '2-3', '3-4', '4-5', '5-6'];

  useEffect(() => {
    const setup = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Notification permissions are not granted');
      }

      try {
        // Load Subjects
        const data = await getSubjectsWithSchedules();
        const loadedSubjects = data.map((s) => ({
          name: s.name,
          code: s.code,
          teacher: s.teacher,
        }));
        setSubjects(loadedSubjects);

        // Load Scheduled Entries
        const scheduleData = await getScheduleEntries() as ScheduleEntry[];
        const newGrid = Array(5).fill(null).map(() => Array(9).fill(null));

        for (const entry of scheduleData) {
          const dayIndex = days.findIndex((d) => d === entry.day);
          const timeIndex = timeSlots.findIndex(
            (slot) => slot.startsWith(entry.start_time.split(':')[0])
          );
          if (dayIndex !== -1 && timeIndex !== -1) {
            newGrid[dayIndex][timeIndex] = {
              name: entry.name,
              code: entry.subject_code,
              teacher: entry.teacher,
            };
          }
        }

        setRoutineGrid(newGrid);
      } catch (err) {
        Alert.alert('Error', 'Failed to load subjects or schedule.');
        console.error(err);
      }
    };

    setup();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);



  const handleDrop = (dayIndex: number, timeIndex: number) => {
    if (dragged) {
      const newGrid = [...routineGrid];
      newGrid[dayIndex][timeIndex] = dragged;
      setRoutineGrid(newGrid);
      setDragged(null);
    }
  };

  const handleDelete = (dayIndex: number, timeIndex: number) => {
    const newGrid = [...routineGrid];
    newGrid[dayIndex][timeIndex] = null;
    setRoutineGrid(newGrid);
  };

  const handleSaveRoutine = async () => {
    try {
      for (let rowIndex = 0; rowIndex < routineGrid.length; rowIndex++) {
        for (let colIndex = 0; colIndex < routineGrid[rowIndex].length; colIndex++) {
          const cell = routineGrid[rowIndex][colIndex];
          if (cell && cell.name !== 'LUNCH') {
            const day = days[rowIndex];
            const [start_time, end_time] = timeSlots[colIndex].split('-');
            await addScheduleEntry({
              day,
              start_time: `${start_time}:00`,
              end_time: `${end_time}:00`,
              subject_code: cell.code,
            });
          }
        }
      }

      Alert.alert('Success', 'Schedule saved successfully!');
    } catch (error) {
      console.error('Failed to save schedule:', error);
      Alert.alert('Error', 'Failed to save schedule.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.gridSection}>
        <View>
          <View style={styles.row}>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Day / Time</Text>
            </View>
            {timeSlots.map((slot, index) => (
              <View key={index} style={styles.headerCell}>
                <Text style={styles.headerText}>{slot}</Text>
              </View>
            ))}
          </View>

          {days.map((day, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>{day}</Text>
              </View>
              {routineGrid[rowIndex].map((cell, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={styles.cell}
                  onPress={() => handleDrop(rowIndex, colIndex)}
                >
                  {cell && (
                    <View style={styles.subjectMini}>
                      <TouchableOpacity
                        style={styles.deleteIcon}
                        onPress={() => handleDelete(rowIndex, colIndex)}
                      >
                        <Ionicons name="close-circle" size={16} color="#fff" />
                      </TouchableOpacity>
                      <Text style={styles.subjectText}>{cell.name}</Text>
                      <Text style={styles.subjectSubText}>{cell.teacher}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.subjectBox}>
        <Text style={styles.subjectBoxTitle}>📚 Subjects</Text>
        <ScrollView contentContainerStyle={styles.subjectContainer}>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject.code}
              style={styles.subjectCard}
              onLongPress={() => setDragged(subject)}
            >
              <Text style={styles.subjectText}>{subject.name}</Text>
              <Text style={styles.subjectSubText}>{subject.teacher}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveRoutine}>
          <Text style={styles.saveButtonText}>Save Routine</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dragInfoBar}>
        <Text style={styles.dragInfoText}>
          Hold the subject...and then tap on Column to place it
        </Text>
      </View>

      {dragged && (
        <View
          style={{
            position: 'absolute',
            bottom: 80,
            left: 20,
            backgroundColor: '#3E00FF',
            padding: 12,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Selected:</Text>
          <Text style={{ color: 'white' }}>{dragged.name}</Text>
        </View>
      )}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F0F6FF',
    padding: 10,
  },
  gridSection: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  headerCell: {
    width: 110,
    height: 70,
    backgroundColor: '#3E00FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  cell: {
    width: 110,
    height: 70,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectMini: {
    backgroundColor: '#00BFFF',
    padding: 6,
    borderRadius: 6,
    alignItems: 'center',
    position: 'relative',
  },
  deleteIcon: {
    position: 'absolute',
    top: -4,
    right: -4,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
  },
  subjectBox: {
    width: 140,
    backgroundColor: '#fff',
    marginLeft: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00BFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-between',
  },
  subjectBoxTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E00FF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subjectContainer: {
    gap: 10,
    paddingBottom: 20,
  },
  subjectCard: {
    backgroundColor: '#3E00FF',
    padding: 10,
    borderRadius: 10,
  },
  subjectText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  subjectSubText: {
    color: '#fff',
    fontSize: 10,
  },
  saveButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dragInfoBar: {
    position: 'absolute',
    bottom: 6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragInfoText: {
    fontSize: 24,
    color: '#555',
    fontStyle: 'italic',
  },
});
