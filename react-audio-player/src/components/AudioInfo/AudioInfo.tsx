import React, { useEffect, useState } from 'react';
import { useNav } from '../../store/NavContext';
import styles from './AudioInfoStyles.module.css';
import defaultAlbumArt from '../../assets/photo1.jpg';
import { extractMetadata } from '../../config/config';

interface AudioMetadata {
  title: string;
  artist: string;
  album: string;
  picture: string | null;
}

const AudioInfo: React.FC = () => {
  const { audioFile } = useNav();
  const [metadata, setMetadata] = useState<AudioMetadata>({
    title: 'Unknown Title',
    artist: 'Unknown Artist',
    album: 'Unknown Album',
    picture: null,
  });

  useEffect(() => {
    if (audioFile) {
      const fetchMetadata = async () => {
        const fetchedMetadata = await extractMetadata(audioFile);
        setMetadata(fetchedMetadata);
      };

      fetchMetadata();
    }
  }, [audioFile]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.audioContainer}>
        {audioFile && <h1>Now Playing</h1>}
        <img
          src={metadata.picture || defaultAlbumArt}
          alt='Album Art'
          className={styles.albumImage}
        />
        <h2>{metadata.title}</h2>
        <h3>{metadata.artist}</h3>
      </div>
    </div>
  );
};

export default AudioInfo;
