import VerifyPage from './verify';
import SignupPage from './signup';
import AddSubjectsPage from './subjects';
import ScheduleBuilderPage from './scheduleBuilder';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation'; // adjust path if needed
import AccountReadyPage from './acountReady';

const Stack = createNativeStackNavigator<RootStackParamList>();


<Stack.Navigator initialRouteName="SignUpPage">
  <Stack.Screen name="SignUpPage" component={SignupPage} />
  <Stack.Screen name="AddSubjects" component={AddSubjectsPage} />
  <Stack.Screen name="ScheduleBuilder" component={ScheduleBuilderPage} />
  <Stack.Screen name="Verify" component={VerifyPage} /> {/* ✅ Add this */}
  <Stack.Screen name="AccountReady" component={AccountReadyPage} /> {/* ✅ Add this */}
</Stack.Navigator>
