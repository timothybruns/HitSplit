import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AudioCue from '../components/AudioCue';

const TimerScreen = ({ route, navigation }) => {
  const { highIntensityDuration, restDuration, cycles } = route.params;
  const [currentCycle, setCurrentCycle] = useState(1);
  const [isHighIntensity, setIsHighIntensity] = useState(true);
  const [timer, setTimer] = useState(highIntensityDuration);

  useEffect(() => {
    if (timer === 0) {
      if (isHighIntensity) {
        setTimer(restDuration);
      } else {
        setTimer(highIntensityDuration);
        setCurrentCycle(currentCycle + 1);
      }
      setIsHighIntensity(!isHighIntensity);
      AudioCue.play();
    }

    if (currentCycle > cycles) {
      navigation.navigate('Settings');
    }

    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isHighIntensity, currentCycle]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {isHighIntensity ? 'High Intensity' : 'Rest'}: {timer}s
      </Text>
      <Text style={styles.cycleText}>Cycle: {currentCycle}/{cycles}</Text>
      <Button title="Stop" onPress={() => navigation.navigate('Settings')} />
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
    fontSize: 48,
    marginBottom: 20,
  },
  cycleText: {
    fontSize: 24,
    marginBottom: 40,
  },
});

export default TimerScreen;
