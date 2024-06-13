import React, { useEffect, useState } from 'react';
import { IAudioMetadata, IPicture, parseBlob } from 'music-metadata-browser';
import styles from './AudioInfoStyles.module.css';
import defaultAlbumArt from '../../assets/photo1.jpg';
import { useNav } from '../../store/NavContext';

interface AudioMetadata {
  common: {
    title?: string;
    artist?: string;
    picture?: IPicture[];
  };
}

const AudioInfo = () => {
  const { audioFile } = useNav();
  const [metadata, setMetadata] = useState<AudioMetadata | null>(null);
  const [albumArt, setAlbumArt] = useState<string>(defaultAlbumArt);

  useEffect(() => {
    if (audioFile) {
      const fetchMetadata = async () => {
        try {
          const metadata: IAudioMetadata = await parseBlob(audioFile);
          setMetadata(metadata);

          const picture = metadata.common.picture?.[0];
          if (picture) {
            const url = URL.createObjectURL(
              new Blob([picture.data], { type: picture.format })
            );
            setAlbumArt(url);
          }
        } catch (error) {
          console.error('Error reading metadata:', error);
        }
      };

      fetchMetadata();
    }
  }, [audioFile]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.audioContainer}>
        {audioFile && <h1>Now Playing</h1>}
        <img
          src={albumArt}
          alt='Album Art'
          className={styles.albumImage}
        />
        <h2>{metadata?.common.title || audioFile?.name || 'Unknown Title'}</h2>
        <h3>{metadata?.common.artist || 'Unknown Artist'}</h3>
      </div>
    </div>
  );
};

export default AudioInfo;
