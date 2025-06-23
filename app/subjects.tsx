import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function AddSubjectsPage() {
  const [subjects, setSubjects] = useState([
    { name: '', code: '', teacher: '' },
    { name: '', code: '', teacher: '' },
    { name: '', code: '', teacher: '' },
  ]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: '', code: '', teacher: '' }]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>Attend<Text style={styles.accent}>Ease</Text></Text>
      <Text style={styles.label}>Enter Your Subjects</Text>

      {subjects.map((subject, index) => (
        <View key={index} style={styles.subjectGroup}>
          <TextInput
            style={styles.input}
            placeholder={`Enter Subject Name`}
            value={subject.name}
            onChangeText={(text) => {
              const newList = [...subjects];
              newList[index].name = text;
              setSubjects(newList);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Subject Code"
            value={subject.code}
            onChangeText={(text) => {
              const newList = [...subjects];
              newList[index].code = text;
              setSubjects(newList);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Subject Teacher"
            value={subject.teacher}
            onChangeText={(text) => {
              const newList = [...subjects];
              newList[index].teacher = text;
              setSubjects(newList);
            }}
          />
        </View>
      ))}

      <TouchableOpacity onPress={handleAddSubject} style={styles.addMore}>
        <Text style={styles.addText}>+ Add More Subjects</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
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
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#3E00FF',
  },
  accent: {
    color: '#00D4FF',
  },
  label: {
    fontSize: 16,
    marginVertical: 20,
    color: '#3E00FF',
  },
  subjectGroup: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  addMore: {
    marginVertical: 10,
  },
  addText: {
    color: '#6A00FF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00BFFF',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
