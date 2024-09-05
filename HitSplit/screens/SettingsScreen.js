import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [highIntensityDuration, setHighIntensityDuration] = useState(30);
  const [restDuration, setRestDuration] = useState(30);
  const [cycles, setCycles] = useState(5);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>High-Intensity Duration (seconds):</Text>
      <TextInput 
        style={styles.input} 
        value={String(highIntensityDuration)} 
        onChangeText={(value) => setHighIntensityDuration(parseInt(value))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Rest Duration (seconds):</Text>
      <TextInput 
        style={styles.input} 
        value={String(restDuration)} 
        onChangeText={(value) => setRestDuration(parseInt(value))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Number of Cycles:</Text>
      <TextInput 
        style={styles.input} 
        value={String(cycles)} 
        onChangeText={(value) => setCycles(parseInt(value))}
        keyboardType="numeric"
      />

      <Button 
        title="Start HIIT"
        onPress={() => navigation.navigate('Timer', { highIntensityDuration, restDuration, cycles })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SettingsScreen;
