import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [highIntensityDuration, setHighIntensityDuration] = useState('30');
  const [restDuration, setRestDuration] = useState('30');
  const [cycles, setCycles] = useState('5');

  const handleNumericInput = (value, setValue) => {
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setValue(value);
    }
  };

  return (
    // Dismiss keyboard when tapping outside input fields
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>High-Intensity Duration (seconds):</Text>
        <TextInput 
          style={styles.input} 
          value={highIntensityDuration} 
          onChangeText={(value) => handleNumericInput(value, setHighIntensityDuration)}
          keyboardType="numeric"
          returnKeyType="done"
        />

        <Text style={styles.label}>Rest Duration (seconds):</Text>
        <TextInput 
          style={styles.input} 
          value={restDuration} 
          onChangeText={(value) => handleNumericInput(value, setRestDuration)}
          keyboardType="numeric"
          returnKeyType="done"
        />

        <Text style={styles.label}>Number of Cycles:</Text>
        <TextInput 
          style={styles.input} 
          value={cycles} 
          onChangeText={(value) => handleNumericInput(value, setCycles)}
          keyboardType="numeric"
          returnKeyType="done"
        />

        <Button 
          title="Start HIIT"
          onPress={() => navigation.navigate('Timer', {
            highIntensityDuration: parseInt(highIntensityDuration) || 0,
            restDuration: parseInt(restDuration) || 0,
            cycles: parseInt(cycles) || 0
          })}
        />
      </View>
    </TouchableWithoutFeedback>
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
