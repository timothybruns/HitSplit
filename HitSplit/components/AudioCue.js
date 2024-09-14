import { Audio } from 'expo-av';

const AudioCue = {
  play: async () => {
    const { sound } = await Audio.Sound.createAsync(
      // require('./assets/cue.mp3') // Replace with your actual file path
    );
    await sound.playAsync();
  }
};

export default AudioCue;