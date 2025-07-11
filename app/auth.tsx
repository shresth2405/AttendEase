import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AuthPage() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* 🔼 Top Section: Logo/Illustration */}
      <View style={styles.topSection}>
        <Image
          source={require('../assets/AttendEase Start Logo.png')}
          style={styles.logoIcon}

          
        />
        

{/* ✅ Bottom Section PNG */}
<Image
  source={require('../assets/Elelments One Side.png')}
  style={styles.bottomImage}
/>




        {/* 🔤 App Title (optional, center-aligned text) */}
        <Text style={styles.logo}>
          <Text style={styles.accent}></Text>
        </Text>
      </View>

      {/* 🔘 Auth Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* 🔽 Bottom Background Decoration */}
      <Image
        source={require('../assets/Elelments One Side.png')}
        style={styles.bottomImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E00FF',
    justifyContent: 'space-between', // ⬅️ This separates top, buttons, and bottom nicely
    alignItems: 'center',
    paddingVertical: 50,
  },

  // 🔝 Top: logo section
  topSection: {
    alignItems: 'center',
  },

  logoIcon: {
    width: 300,
    height: 600,
    resizeMode: 'contain',
    marginBottom: 10, // space between logo & title
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },

  accent: {
    color: '#00D4FF',
  },

  // 🔘 Button area
  buttonGroup: {
    width: '80%',
    marginTop: -60,
    marginBottom: 900,
  },

  button: {
    backgroundColor: '#00D4FF',
    paddingVertical: 14,
    borderRadius: 30,
    marginVertical: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },

  // 🔽 Bottom Decorative PNG
  bottomImage: {
    width: 550,
    height: 550,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -570, // ⬅️ Adjust this to move up/down
    zIndex: 0,   // ⬅️ Keeps it behind all content
    opacity: 0.6
  },


});
