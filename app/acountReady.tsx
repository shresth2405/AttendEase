import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AccountReadyPage() {
  const sprinkleCount = 24;
  const radiusX = 160;
  const radiusY = 130;
  const navigation = useNavigation<any>();

  const scales = useRef(
    [...Array(sprinkleCount)].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    scales.forEach((scale, i) => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
        delay: i * 40,
      }).start();
    });
  }, []);

  const sprinkleCircle = [...Array(sprinkleCount)].map((_, i) => {
    const angle = (2 * Math.PI * i) / sprinkleCount;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    return { x, y };
  });

  return (
    <View style={styles.container}>
      {/* 🔼 Top Decoration */}
      <Image
        source={require('../assets/Elelments One Side.png')}
        style={styles.decorTop}
      />

      {/* 💫 Oval Sprinkle Animation */}
      <View style={styles.ovalWrapper}>
        {sprinkleCircle.map((pos, i) => (
          <Animated.View
            key={i}
            style={[
              styles.sprinkle,
              {
                transform: [
                  { translateX: pos.x },
                  { translateY: pos.y },
                  { scale: scales[i] },
                ],
              },
            ]}
          />
        ))}
        <Text style={styles.title}>Congratulations!{"\n"}Your Account is ready</Text>
      </View>

      {/* 🔘 CTA Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ClassDetails')}
      >
        <Text style={styles.buttonText}>Create Schedule</Text>
      </TouchableOpacity>

      {/* 🔽 Bottom Decoration */}
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
    backgroundColor: '#3E00FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ovalWrapper: {
    position: 'relative',
    width: 280,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    zIndex: 1,
  },

  sprinkle: {
    position: 'absolute',
    width: 12,
    height: 18,
    borderRadius: 10,
    backgroundColor: '#00D4FF',
  },

  button: {
    backgroundColor: '#00D4FF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 40,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  decorTop: {
    position: 'absolute',
    top: 0,
    width: '140%',
    height: 200,
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }],
  },

  decorBottom: {
    position: 'absolute',
    bottom: 0,
    width: '140%',
    height: 200,
    resizeMode: 'contain',
  },
});
