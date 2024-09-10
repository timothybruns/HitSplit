import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* High-Intensity Duration Picker */}
          <Text style={styles.label}>High-Intensity</Text>
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
          <Text style={styles.label}>Rest</Text>
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
          <Text style={styles.label}>Cycles</Text>
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

          {/* Start HIIT Button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('Timer', {
              highIntensityDuration,
              restDuration,
              cycles,
            })}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  pickerContainer: {
    marginBottom: 30,
  },
  picker: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
  },
  pickerItem: {
    fontSize: 24,
    height: 150,
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#ff9500',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;