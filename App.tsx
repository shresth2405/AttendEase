import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';



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
import SyncDashboardPage from './app/syncDashboard'
import { getTodaySchedule } from './database/operation';
// Database Initialization
import { initDB } from './database/initDB';  // ✅ Adjust this path to your DB file
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { registerScheduleNotificationsTask } from './notifications/ScheduleNotification_Background';
import { registerHistoryRecoveryTask } from './notifications/AddHistory_Background';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

 

const scheduleNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder!',
          body: 'This is your notification after 10 seconds!',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 10,
        },
      });
      console.log("Scheduled Notification for 10s");
    };

const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications not granted!');
      }
    };



export default function App() {
  useEffect(() => {
  // Run async function safely inside useEffect
  (async () => {
    try {
      await initDB();
      console.log('Database initialized successfully.');

      requestPermissions();
      registerScheduleNotificationsTask();
      registerScheduleNotificationsTask();
      // scheduleNotification();

      
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  })();

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
        <Stack.Screen name="SyncDashboard" component={SyncDashboardPage} />
        <Stack.Screen name="ScheduleBuilder" component={ScheduleBuilderPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
