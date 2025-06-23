import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [roll, setRoll] = useState('');
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* 🔝 Logo at top */}
      <Image
        source={require('../assets/AttendEase Start Logo.png')}
        style={styles.logo}
      />

      {/* 🟦 Signup Card */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>SIGNUP </Text>

        <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} />
        <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="College Name" value={college} onChangeText={setCollege} />
        <TextInput style={styles.input} placeholder="Roll Number" value={roll} onChangeText={setRoll} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Verify')}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* 🔽 Decorative Bottom Strip */}
      <Image
        source={require('../assets/Elelments One Side.png')}
        style={styles.bottomIllustration}
      />
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

  // Logo image
  logo: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    marginTop: -200,
  },

  // 🟦 Signup Card with stroke
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,

    elevation: 6, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    borderWidth: 2,             // ✅ border stroke
    borderColor: '#00BFFF',     // ✅ border color
    marginTop: -500,             // ✅ lift upward
  },

  cardHeading: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00BFFF',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    marginBottom: 18,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#00BFFF',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  bottomIllustration: {
    width: '150%',
    height: 240,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
  },
});
