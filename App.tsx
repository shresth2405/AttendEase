import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

// Pages
import FirstPage from './app/index';
import AuthPage from './app/auth';
import LoginPage from './app/login';
import SignupPage from './app/signup';
import VerifyPage from './app/verify';
import AccountReady from './app/acountReady';
import ClassDetailsPage from './app/classDetails';
import AddSubjectsPage from './app/subjects';
import ScheduleBuilderPage from './app/scheduleBuilder';

// Database Initialization
import { initDB } from './database/initDB';  // ✅ Adjust this path to your DB file

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
  // Run async function safely inside useEffect
  (async () => {
    try {
      await initDB();
      console.log('Database initialized successfully.');

      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Enable notifications to get class alerts!');
      }
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  })();

  const sub = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('Notification tapped:', response.notification.request.content);
  });

  return () => {
    sub.remove();
  };
}, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="First" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="First" component={FirstPage} />
        <Stack.Screen name="Auth" component={AuthPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Verify" component={VerifyPage} />
        <Stack.Screen name="AccountReady" component={AccountReady} />
        <Stack.Screen name="ClassDetails" component={ClassDetailsPage} />
        <Stack.Screen name="AddSubjects" component={AddSubjectsPage} />
        <Stack.Screen name="ScheduleBuilder" component={ScheduleBuilderPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
