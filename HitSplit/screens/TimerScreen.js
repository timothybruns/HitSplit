import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import AudioCue from '../components/AudioCue';

const TimerScreen = ({ route, navigation }) => {
  const { highIntensityDuration, restDuration, cycles } = route.params;
  const [currentCycle, setCurrentCycle] = useState(1);
  const [isHighIntensity, setIsHighIntensity] = useState(true);
  const [timer, setTimer] = useState(highIntensityDuration);
  const [progress, setProgress] = useState(1);  // Start with full progress (1)
  const [isPaused, setIsPaused] = useState(false); // New state for pause/play

  useEffect(() => {
    if (timer === 0) {
      if (isHighIntensity) {
        setTimer(restDuration);
        setProgress(1);  // Reset progress to full
      } else {
        setTimer(highIntensityDuration);
        setProgress(1);  // Reset progress to full
        setCurrentCycle(currentCycle + 1);
      }
      setIsHighIntensity(!isHighIntensity);
      AudioCue.play();
    }

    if (currentCycle > cycles) {
      navigation.navigate('Settings');
    }

    if (!isPaused) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
        const duration = isHighIntensity ? highIntensityDuration : restDuration;
        setProgress((timer - 1) / duration);  // Update progress to decrease
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, isHighIntensity, currentCycle, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);  // Toggle pause state
  };

  return (
    <View style={styles.container}>
      <Progress.Circle
        size={300}
        progress={progress}  // Countdown effect with clockwise motion
        showsText={true}
        formatText={() => `${timer}s`}
        color={isHighIntensity ? '#ff6347' : '#1e90ff'}
        thickness={10}
        textStyle={styles.timerText}
        strokeCap="round"
        borderWidth={0}
        scaleY={-1}  // Ensures clockwise motion
      />
      <Text style={styles.statusText}>
        {isHighIntensity ? 'High Intensity' : 'Rest'}
      </Text>
      <Text style={styles.cycleText}>Cycle: {currentCycle}/{cycles}</Text>

      {/* Custom Pill-Shaped Pause/Play Button */}
      <TouchableOpacity style={styles.pillButton} onPress={togglePause}>
        <Text style={styles.buttonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
      </TouchableOpacity>

      {/* Custom Pill-Shaped Stop Button */}
      <TouchableOpacity style={styles.pillButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  timerText: {
    fontSize: 36,
    color: '#333',
  },
  statusText: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    color: '#666',
  },
  cycleText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 40,
  },
  pillButton: {
    backgroundColor: '#1e90ff',  // Button background color
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,  // Rounded corners for pill shape
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',  // Button text color
    fontWeight: 'bold',
  },
});

export default TimerScreen;
