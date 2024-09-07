import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SettingsScreen = ({ navigation }) => {
  const [highIntensityDuration, setHighIntensityDuration] = useState(30);
  const [restDuration, setRestDuration] = useState(30);
  const [cycles, setCycles] = useState(5);

  const renderPickerItems = (range) => {
    return range.map((item) => (
      <Picker.Item key={item} label={String(item)} value={item} />
    ));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* High-Intensity Duration Picker */}
        <Text style={styles.label}>High-Intensity Duration (seconds):</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={highIntensityDuration}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(value) => setHighIntensityDuration(value)}
          >
            {renderPickerItems([...Array(121).keys()].slice(10))}
          </Picker>
        </View>

        {/* Rest Duration Picker */}
        <Text style={styles.label}>Rest Duration (seconds):</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={restDuration}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(value) => setRestDuration(value)}
          >
            {renderPickerItems([...Array(121).keys()].slice(10))}
          </Picker>
        </View>

        {/* Cycles Picker */}
        <Text style={styles.label}>Number of Cycles:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={cycles}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(value) => setCycles(value)}
          >
            {renderPickerItems([...Array(21).keys()].slice(1))}
          </Picker>
        </View>

        {/* Start HIIT Pill Button */}
        <TouchableOpacity
          style={styles.pillButton}
          onPress={() => navigation.navigate('Timer', {
            highIntensityDuration,
            restDuration,
            cycles,
          })}
        >
          <Text style={styles.pillButtonText}>Start HIIT</Text>
        </TouchableOpacity>
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
    textAlign: 'center',
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
  },
  pickerItem: {
    fontSize: 24,
    height: 150,
    color: '#333',
  },
  pillButton: {
    backgroundColor: '#1e90ff',  // Blue button background color
    paddingVertical: 12,         // Adjust vertical padding
    paddingHorizontal: 40,       // Adjust horizontal padding for pill effect
    borderRadius: 25,            // Rounded corners for pill shape
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',                // Width for pill button appearance
    alignSelf: 'center',
  },
  pillButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SettingsScreen;
