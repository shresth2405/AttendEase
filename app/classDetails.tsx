// app/classDetails.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function ClassDetailsPage() {
  const navigation = useNavigation<any>();

  // State variables for dropdowns
  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [teacher, setTeacher] = useState('');
  const [studentCount, setStudentCount] = useState('');

  return (
    <View style={styles.container}>
      {/* 🔝 App Logo */}
      <Image
        source={require('../assets/Logo for other Pages.png')}
        style={styles.logo}
      />

      {/* 🔲 Card Container */}
      <View style={styles.card}>
        <Text style={styles.heading}>Fill Your Details</Text>

        {/* 🔽 Class Name */}
        <Text style={styles.label}>No. of Days you have classes in a week</Text>
        <Picker
          selectedValue={className}
          onValueChange={(itemValue) => setClassName(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Choose No. Days" value="" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>

        {/* 🔽 Class Code */}
        <Text style={styles.label}>Select Class Code</Text>
        <Picker
          selectedValue={classCode}
          onValueChange={(itemValue) => setClassCode(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Enter Duration of each class" value="" />
          <Picker.Item label="30 mins" value="30 mins" />
          <Picker.Item label="45 mins" value="45 mins" />
          <Picker.Item label="60 mins" value="60 mins" />
        </Picker>

        {/* 🔽 Teacher Name */}
        <Text style={styles.label}>Enter Maximum No. of classes you have in a day</Text>
        <Picker
          selectedValue={teacher}
          onValueChange={(itemValue) => setTeacher(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Choose a Number" value="" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="11" value="11" />
        </Picker>

        {/* 🔽 No. of Students */}
        <Text style={styles.label}>Total No.of subjects you have </Text>
        <Picker
          selectedValue={studentCount}
          onValueChange={(itemValue) => setStudentCount(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Number" value="" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="11" value="11" />
          <Picker.Item label="12" value="12" />
          <Picker.Item label="13" value="13" />
        </Picker>

        {/* 🔘 Continue Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddSubjects')}
        >
          <Text style={styles.buttonText}>Save Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
  },

  // 🔝 Logo at the top
  logo: {
    width:400,
    height:400,
    resizeMode: 'contain',
    marginTop: -120,
  },

  // 🔲 Card Box Styling
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderWidth: 6,
    borderColor: '#00D4FF',
    marginTop: -400,
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00D4FF',
    textAlign: 'center',
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 16,
    color: '#4F46E5',
  },

  picker: {
    backgroundColor: '#C4B5FD',
    borderColor: '#000',
    borderWidth: 8,
    borderRadius:6,
    marginBottom: 10,
    height: 60,
      zIndex: 0,
  },

  button: {
    backgroundColor: '#00D4FF',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
