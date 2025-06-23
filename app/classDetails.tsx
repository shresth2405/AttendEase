// app/classDetails.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ClassDetailsPage() {
  const navigation = useNavigation<any>();
  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [teacher, setTeacher] = useState('');
  const [studentCount, setStudentCount] = useState('');

  return (
    <View style={styles.container}>
      {/* 🔼 Top Decorative PNG (Rotated) */}
      <Image
        source={require('../assets/Elelments One Side.png')}
        style={styles.decorTop}
      />

      {/* 📝 Heading */}
      <Text style={styles.heading}>Enter Class Details</Text>

      {/* 🧾 Input Fields */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Class Name"
          value={className}
          onChangeText={setClassName}
        />
        <TextInput
          style={styles.input}
          placeholder="Class Code"
          value={classCode}
          onChangeText={setClassCode}
        />
        <TextInput
          style={styles.input}
          placeholder="Teacher Name"
          value={teacher}
          onChangeText={setTeacher}
        />
        <TextInput
          style={styles.input}
          placeholder="No. of Students"
          value={studentCount}
          onChangeText={setStudentCount}
          keyboardType="numeric"
        />
      </View>

      {/* ➡️ Continue Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddSubjects')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* 🔽 Bottom Decorative PNG */}
      <Image
        source={require('../assets/Elelments One Side.png')}
        style={styles.decorBottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E00FF',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00D4FF',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  decorTop: {
    position: 'absolute',
    top: 0,
    width: '150%',
    height: 180,
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }],
  },
  decorBottom: {
    position: 'absolute',
    bottom: 0,
    width: '150%',
    height: 180,
    resizeMode: 'contain',
  },
});
