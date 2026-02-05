import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Keyboard, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SettingsScreen = ({ navigation }) => {
  const [highIntensityDuration, setHighIntensityDuration] = useState(60);
  const [restDuration, setRestDuration] = useState(60);
  const [cycles, setCycles] = useState(5);

  // Calculate total workout time
  const totalSeconds = (highIntensityDuration + restDuration) * cycles;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  const renderPickerItems = (range) => {
    return range.map((item) => (
      <Picker.Item key={item} label={String(item)} value={item} />
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
              {/* Total Workout Time Display */}
              <View style={styles.totalTimeContainer}>
                <Text style={styles.totalTimeLabel}>Total Workout Time</Text>
                <Text style={styles.totalTimeValue}>
                  {totalMinutes}:{remainingSeconds.toString().padStart(2, '0')}
                </Text>
              </View>

              {/* High-Intensity Duration Picker */}
              <Text style={styles.label}>High-Intensity (seconds)</Text>
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
              <Text style={styles.label}>Rest (seconds)</Text>
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
                <Text style={styles.startButtonText}>Start Workout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#000',
  },
  totalTimeContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
  },
  totalTimeLabel: {
    fontSize: 16,
    color: '#8e8e93',
    marginBottom: 5,
  },
  totalTimeValue: {
    fontSize: 48,
    fontWeight: '200',
    color: '#fff',
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
    marginTop: 5,
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
