// app/verify.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ Added for navigation

export default function VerifyPage() {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation<any>(); // ✅ Navigation hook

  return (
    <View style={styles.container}>
      {/* 🔼 Top decorative image */}
      <Image source={require('../assets/Elelments One Side.png')} style={styles.decorTop} />

      {/* 🔤 Heading */}
      <Text style={styles.heading}>Verify Number</Text>

      {/* 🔢 OTP Input */}
      <TextInput
        style={styles.otpInput}
        placeholder="____"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />

      {/* 🔘 Verify Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AccountReady')} // ✅ Navigate on press
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      {/* 🔽 Bottom decorative image */}
      <Image source={require('../assets/Elelments One Side.png')} style={styles.decorBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  heading: {
    fontSize: 48,
    color: '#00BFFF',
    fontWeight: 'bold',
  },
  otpInput: {
    fontSize: 48,
    borderBottomWidth: 2,
    borderColor: '#ccc',
    padding: 10,
    textAlign: 'center',
    width: '50%',
  },
  button: {
    backgroundColor: '#00D4FF',
    paddingVertical: 20,
    paddingHorizontal: 160,
    borderRadius: 24,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  decorTop: {
    position: 'absolute',
    top: 0,
    width: '150%',
    height: 200,
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }],
  },
  decorBottom: {
    position: 'absolute',
    bottom: 0,
    width: '150%',
    height: 200,
    resizeMode: 'contain',
  },
});
