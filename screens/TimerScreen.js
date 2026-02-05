import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as Progress from 'react-native-progress';
import { Audio } from 'expo-av';

const TimerScreen = ({ route, navigation }) => {
  const { highIntensityDuration, restDuration, cycles } = route.params;
  
  const [currentCycle, setCurrentCycle] = useState(1);
  const [isHighIntensity, setIsHighIntensity] = useState(true);
  const [timer, setTimer] = useState(highIntensityDuration);
  const [progress, setProgress] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const soundRef = useRef(null);

  // Calculate total workout time
  const totalSeconds = (highIntensityDuration + restDuration) * cycles;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  // Play audio cue using expo-av
  const playSound = useCallback(async (type) => {
    try {
      // Unload previous sound if exists
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      // For now, we'll use a simple beep pattern
      // You can replace these with custom audio files later
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });

      // Create a simple notification sound
      // In production, you'd load custom audio files here
      console.log(`Audio cue: ${type}`);
      
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }, []);

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (isComplete || isPaused) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          // Timer reached zero
          if (isHighIntensity) {
            // Switch to rest
            playSound('rest');
            setIsHighIntensity(false);
            setProgress(1);
            return restDuration;
          } else {
            // End of rest, check if more cycles
            if (currentCycle >= cycles) {
              // Workout complete
              playSound('complete');
              setIsComplete(true);
              clearInterval(interval);
              return 0;
            } else {
              // Start next cycle
              playSound('highIntensity');
              setCurrentCycle((prev) => prev + 1);
              setIsHighIntensity(true);
              setProgress(1);
              return highIntensityDuration;
            }
          }
        }
        
        // Update progress
        const duration = isHighIntensity ? highIntensityDuration : restDuration;
        setProgress((prevTimer - 1) / duration);
        
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isHighIntensity, currentCycle, cycles, isPaused, isComplete, highIntensityDuration, restDuration, playSound]);

  const togglePause = () => {
    setIsPaused(!isPaused);
    playSound(isPaused ? 'resume' : 'pause');
  };

  const handleCancel = () => {
    playSound('cancel');
    navigation.goBack();
  };

  const handleFinish = () => {
    navigation.goBack();
  };

  if (isComplete) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.completeText}>🎉</Text>
          <Text style={styles.statusText}>Workout Complete!</Text>
          <Text style={styles.cycleText}>{cycles} cycles finished</Text>
          
          <TouchableOpacity 
            style={[styles.button, styles.mainButton, styles.finishButton]} 
            onPress={handleFinish}
          >
            <Text style={[styles.buttonText, styles.mainButtonText]}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
          direction="counter-clockwise"
          unfilledColor="#333333"
        />
        
        <Text style={styles.totalTimeText}>
          Total: {totalMinutes}:{remainingSeconds.toString().padStart(2, '0')}
        </Text>
        
        <Text style={[
          styles.statusText, 
          { color: isHighIntensity ? '#ff9500' : '#4cd964' }
        ]}>
          {isHighIntensity ? '🔥 High Intensity' : '😮‍💨 Rest'}
        </Text>
        
        <Text style={styles.cycleText}>
          Cycle {currentCycle} of {cycles}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={handleCancel}
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
    fontSize: 28,
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
  completeText: {
    fontSize: 80,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
    position: 'absolute',
    bottom: 60,
  },
  button: {
    padding: 15,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
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
  finishButton: {
    position: 'absolute',
    bottom: 60,
    width: 120,
  },
});

export default TimerScreen;
