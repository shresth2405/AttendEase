import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ❗Make sure this is installed
import { useNavigation } from '@react-navigation/native'; // ✅ Add navigation
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addSubject, deleteAllSubjects, getAllSubjects } from '../database/operation';

export default function AddSubjectsPage() {
  const [subjects, setSubjects] = useState([
    { name: '', code: '', teacher: '' },
    { name: '', code: '', teacher: '' },
    { name: '', code: '', teacher: '' },
  ]);


  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const existingSubjects = await getAllSubjects();
        if (existingSubjects.length > 0) {
          setSubjects(existingSubjects);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: '', code: '', teacher: '' }]);
  };

  const handleDeleteSubject = (index: number) => {
    const updated = [...subjects];
    updated.splice(index, 1);
    setSubjects(updated);
  };



  const handleSaveDetails = async () => {
    // 🔁 Save logic here (store to state or context)
    try {
      await deleteAllSubjects();
      for (const subject of subjects) {
        if (subject.name.trim() && subject.code.trim()) {
          try {
            await addSubject({
              name: subject.name.trim(),
              code: subject.code.trim(),
              teacher: subject.teacher.trim(),
            });
          } catch (error: any) {
            if (error.message.includes('UNIQUE constraint failed')) {
              Alert.alert(
                'Duplicate Code',
                `Subject code "${subject.code}" already exists. Please change it.`
              );
              return;
            } else {
              console.error('Database error:', error);
              Alert.alert('Error', 'Failed to save subjects.');
              return;
            }
          }
        }
      }
      Alert.alert('Success', 'Subjects saved successfully!');
      setSubjects([{ name: '', code: '', teacher: '' }]); // Clear form
      navigation.navigate('ScheduleBuilder');
      // ✅ Redirect after save
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'Unexpected error occurred.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔝 Logo Image */}
      <Image
        source={require('../assets/Logo for other Pages.png')}
        style={styles.logo}
      />

      {/* 🏷️ Heading */}
      <Text style={styles.label}>Enter Your Subjects</Text>

      {/* 🔁 Subject Inputs */}
      {subjects.map((subject, index) => (
        <View key={index} style={styles.subjectCard}>
          {/* 🔢 Section Number and Delete */}
          <View style={styles.subjectHeader}>
            <Text style={styles.sectionNumber}>{index + 1}.</Text>
            <TouchableOpacity onPress={() => handleDeleteSubject(index)}>
              <Ionicons name="trash-outline" size={22} color="#FF3B30" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter Subject Name"
            value={subject.name}
            onChangeText={(text) => {
              const newList = [...subjects];
              newList[index].name = text;
              setSubjects(newList);
            }}
          />

          {/* 🔄 Code + Teacher in one row */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.codeInput]}
              placeholder="Code"
              value={subject.code}
              onChangeText={(text) => {
                const newList = [...subjects];
                newList[index].code = text;
                setSubjects(newList);
              }}
            />
            <TextInput
              style={[styles.input, styles.teacherInput]}
              placeholder="Teacher Name"
              value={subject.teacher}
              onChangeText={(text) => {
                const newList = [...subjects];
                newList[index].teacher = text;
                setSubjects(newList);
              }}
            />
          </View>
        </View>
      ))}

      {/* ➕ Add More Button Styled */}
      <TouchableOpacity onPress={handleAddSubject} style={styles.addMoreBox}>
        <Text style={styles.addText}>+ Add More Subjects</Text>
      </TouchableOpacity>

      {/* 💾 Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSaveDetails}>
        <Text style={styles.buttonText}>Save Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },

  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginBottom: -150,
    marginTop: -100,
  },

  label: {
    fontSize: 32,
    marginVertical: 20,
    color: '#00BFFF',
    fontWeight: 'bold',
  },

  // 🔲 Subject card wrapper
  subjectCard: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#00BFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#F9FCFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  // 🔢 Number + delete
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E00FF',
  },

  input: {
    borderWidth: 1,
    borderColor: '#00BFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  codeInput: {
    flex: 0.2,
  },

  teacherInput: {
    flex: 0.8,
  },

  addMoreBox: {
    marginVertical: 16,
    borderWidth: 3,
    borderColor: '#00BFFF',
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 12,
  },

  addText: {
    color: '#00BFFF',
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#00BFFF',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});