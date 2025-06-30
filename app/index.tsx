import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function FirstPage() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Auth');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔼 TOP DECORATIVE IMAGE */}
      <Image
        source={require('../assets/Elelments One Side.png')}
        style={styles.strip}
      />

      {/* 🔁 ROTATED DECORATIVE IMAGE (below top) */}
      <Image
        source={require('../assets/Elelments One Side.png')}
        style={styles.rotatedTop}
      />

      {/* 🧍 LOGO IMAGE */}
      <Image
        source={require('../assets/AttendEase Start Logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        <Text style={styles.accent}></Text>
      </Text>

      {/* 🔽 BOTTOM DECORATIVE IMAGE */}
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
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 0,
  },

  // 🔼 Top Image (Increased Size)
  strip: {
    width: '0%', // ⬅️ Wider than screen for dramatic effect
    height: 0,   // ⬆️ Increased from 100
    resizeMode: 'contain',
  },

  // 🔁 Rotated Image (Increased Size)
  rotatedTop: {
    width: '180%',
    height: 250,
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }],
    marginTop: -70, // optional spacing tweak
    opacity: 0.6
  },

  // 🧍 Logo (kept the same, you can also enlarge it)
  logo: {
    width: 320,    // ⬆️ Increased from 300
    height: 320,
    resizeMode: 'contain',
    marginVertical: 10,
  },

  title: {
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
  },

  accent: {
    color: '#00D4FF',
  },

  // 🔽 Bottom Image (Increased Size)
  bottomImage: {
    width: '180%',
    height: 250, // ⬆️ Increased from 100
    resizeMode: 'contain',
    marginBottom: -20,
    opacity: 0.6
  },
});
