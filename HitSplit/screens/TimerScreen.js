import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as Progress from 'react-native-progress';
import AudioCue from '../components/AudioCue';

const TimerScreen = ({ route, navigation }) => {
  const { highIntensityDuration, restDuration, cycles } = route.params;
  const highIntensityDurationNum = Number(highIntensityDuration);
  const restDurationNum = Number(restDuration);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [isHighIntensity, setIsHighIntensity] = useState(true);
  const [timer, setTimer] = useState(highIntensityDuration);
  const [progress, setProgress] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

    // Add console logs here to verify the passed parameters
    useEffect(() => {
      console.log('highIntensityDuration:', highIntensityDuration);
      console.log('restDuration:', restDuration);
      console.log('cycles:', cycles);
  
      // Add logs for each step of the calculation
      const totalSecondsPerCycle = highIntensityDuration + restDuration;
      console.log('Total seconds per cycle:', totalSecondsPerCycle);
  
      const totalSecondsAllCycles = totalSecondsPerCycle * cycles;
      console.log('Total seconds for all cycles:', totalSecondsAllCycles);
  
      const totalWorkoutTime = Math.ceil(totalSecondsAllCycles / 60);
      console.log('Total workout time in minutes:', totalWorkoutTime);
    }, []);

  // Calculate total workout time in minutes
  const totalWorkoutTime = Math.ceil((((highIntensityDurationNum + restDurationNum)) * cycles / 60));


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
        <Text style={styles.totalTimeText}>Total workout time: {totalWorkoutTime} min</Text>
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
  totalTimeText: {
    fontSize: 16,
    color: '#8e8e93',
    marginTop: 10,
    marginBottom: 20,
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
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
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