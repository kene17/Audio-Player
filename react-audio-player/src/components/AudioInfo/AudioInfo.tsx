import React, { useEffect, useState } from 'react';
import { useNav } from '../../store/NavContext';
import styles from './AudioInfoStyles.module.css';
import defaultAlbumArt from '../../assets/photo1.jpg';

const AudioInfo: React.FC = () => {
  const { currentAudioFile, audioFiles } = useNav();
  const [metadata, setMetadata] = useState({
    title: 'Unknown Title',
    artist: 'Unknown Artist',
    album: 'Unknown Album',
    url: '',
  });
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    if (currentAudioFile) {
      const foundAudio = audioFiles.find(
        (audio) => audio.url === currentAudioFile.url
      );
      if (foundAudio) {
        setMetadata(foundAudio);
        const index = audioFiles.indexOf(foundAudio);
        setCurrentIndex(index + 1);
      } else {
        setCurrentIndex(null);
      }
    }
  }, [currentAudioFile, audioFiles]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.audioContainer}>
        {currentAudioFile && currentIndex !== null && (
          <h1>
            Now Playing {currentIndex}/{audioFiles.length}
          </h1>
        )}
        <img
          src={defaultAlbumArt} // Default image since picture is not available
          alt='Album Art'
          className={styles.albumImage}
        />
        <h2>{metadata.title}</h2>
        <h3>{metadata.artist}</h3>
        <h3>{metadata.album}</h3>
      </div>
    </div>
  );
};

export default AudioInfo;
