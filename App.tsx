import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FirstPage from './app/index';
import AuthPage from './app/auth';
import LoginPage from './app/login';
import SignupPage from './app/signup';
import VerifyPage from './app/verify';
import AccountReady from './app/acountReady';
import ClassDetailsPage from './app/classDetails';
import AddSubjectsPage from './app/subjects';

const Stack = createNativeStackNavigator();

export default function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
