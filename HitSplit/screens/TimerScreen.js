import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as Progress from 'react-native-progress';
import AudioCue from '../components/AudioCue';

const TimerScreen = ({ route, navigation }) => {
  const { highIntensityDuration, restDuration, cycles } = route.params;
  const [currentCycle, setCurrentCycle] = useState(1);
  const [isHighIntensity, setIsHighIntensity] = useState(true);
  const [timer, setTimer] = useState(highIntensityDuration);
  const [progress, setProgress] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      if (isHighIntensity) {
        setTimer(restDuration);
        setProgress(1);
      } else {
        setTimer(highIntensityDuration);
        setProgress(1);
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
        setProgress((timer - 1) / duration);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, isHighIntensity, currentCycle, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Progress.Circle
          size={280}
          progress={progress}
          showsText={true}
          formatText={() => `${timer}`}
          color={isHighIntensity ? '#ff9500' : '#4cd964'}
          thickness={6}
          textStyle={styles.timerText}
          strokeCap="round"
          borderWidth={0}
          scaleY={-1}
          unfilledColor="#333333"
        />
        <Text style={styles.statusText}>
          {isHighIntensity ? 'High Intensity' : 'Rest'}
        </Text>
        <Text style={styles.cycleText}>Cycle {currentCycle} of {cycles}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.mainButton]} 
            onPress={togglePause}
          >
            <Text style={[styles.buttonText, styles.mainButtonText]}>
              {isPaused ? 'Resume' : 'Pause'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    alignItems: 'center',
    backgroundColor: '#000',
    paddingBottom: 50,
  },
  timerText: {
    fontSize: 80,
    fontWeight: '200',
    color: '#fff',
  },
  statusText: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
    fontWeight: '600',
  },
  cycleText: {
    fontSize: 20,
    color: '#8e8e93',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 40,
  },
  button: {
    padding: 15,
    borderRadius: 50,
    width: 90,  // Increased width
    height: 90, // Increased height
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14, // Reduced font size
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#2c2c2e',
  },
  cancelButtonText: {
    color: '#ff453a',
  },
  mainButton: {
    backgroundColor: '#ff9500',
  },
  mainButtonText: {
    color: '#000',
  },
});

export default TimerScreen;