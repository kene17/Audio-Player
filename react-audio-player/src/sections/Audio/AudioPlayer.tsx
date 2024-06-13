import AudioPlayerCard from '../../components/AudioPlayerCard/AudioPlayerCard';
import styles from './AudioPlayerStyles.module.css';

function AudioPlayer() {
  return (
    <div className={styles.AudioPlayer}>
      <AudioPlayerCard />
    </div>
  );
}

export default AudioPlayer;
