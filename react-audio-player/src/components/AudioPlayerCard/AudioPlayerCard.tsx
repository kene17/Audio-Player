import AudioInfo from '../AudioInfo/AudioInfo';
import AudioControls from '../AudioControls/AudioControls';
import FileUpload from '../FileUpload/FileUpload';
import { useNav } from '../../store/NavContext';
import styles from './AudioPLayerCardStyles.module.css';

const AudioPlayerCard = () => {
  const { audioFile } = useNav();
  console.log('audio player', audioFile);

  return (
    <div className={styles.audioPlayerCard}>
      <FileUpload />
      {audioFile && (
        <>
          <AudioInfo />
          <AudioControls />
        </>
      )}
    </div>
  );
};

export default AudioPlayerCard;
