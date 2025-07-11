import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { syncHistory, syncSchedule, syncSubject } from '../database/sync';

// Type for navigation prop


const SyncDashboard: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleSync = async()=>{
    await syncHistory();
    await syncSchedule();
    await syncSubject();
    Alert.alert("All data have been synced");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSync}>
        <Text style={styles.buttonText}>Sync All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SyncDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
