import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleData = async()=>{
    if(!email || !password){
      Alert.alert("All field are required");
      return;
    }
    const data = {
      "email": email,
      "password": password,
    };
    console.log("UserData", data);

    try{
      const response = await fetch("https://attendease-backend-mtdj.onrender.com/api/user/login",{
        method: 'POST',
        headers:{
          'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
      })
      if(response.ok){
        const result = await response.json();
        // console.log(result);
        console.log("User logged in successfully");
        navigation.navigate('AccountReady')
      }else{
        const error = await response.text();
        console.error("Failed", response.status);
        Alert.alert("Login Failed",error);
      }
    }catch(err){
      console.error("Error:",err)
      Alert.alert('Network Error', 'Unable to reach server.');
    }
  }

  return (
    <View style={styles.container}>
      {/* 🔝 App Logo */}
      <Image
        source={require('../assets/AttendEase Start Logo.png')}
        style={styles.logo}
      />

      {/* 🔲 Floating Card Container */}
      <View style={styles.card}>
        {/* Title with icon */}
        <Text style={styles.cardHeading}>LOGIN <Image
        source={require('../assets/Login Icon.png')}
        style={{ width: 40, height: 40, resizeMode: 'contain' }}
      /></Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Email ID"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
        />

        {/* Resend & Forgot password row */}
        <View style={styles.row}>
          <Text style={styles.link}>Resend OTP 0:45</Text>
          <Text style={styles.link}>Forgot Password?</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleData}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* 🔽 Bottom Decorative Illustration */}
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

  // 🧍 Logo at Top
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: -120,
  },

  // 🔲 Card Container for Form
  card: {
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 80,
  elevation: 6, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 6,

  // ✨ NEW: Add border stroke
  borderWidth: 6,
  borderColor: '#00BFFF',

  // ⬆️ NEW: Lift card upwards
  marginTop: -500,
},

  // 🪪 LOGIN Title
  cardHeading: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00BFFF',
    textAlign: 'center',
    marginBottom: 40,
  },

  // 🔤 Inputs
  input: {
    borderBottomWidth: 1,
    borderColor: '#00BFFF',
    paddingVertical: 12,
    marginBottom: 18,
    fontSize: 16,
  },

  // 🔁 OTP row
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  link: {
    fontSize: 13,
    color: '#00BFFF',
  },

  // 🔘 Login Button
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

  // 🎨 Bottom Decoration PNG
  bottomIllustration: {
    width: '150%',
    height: 230,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
  },
});
