import React from 'react';
import { AudioFile, useNav } from '../../store/NavContext';
import styles from './AudioListStyles.module.css';
import defaultAlbumArt from '../../assets/photo1.jpg';

const AudioList: React.FC = () => {
  const { audioFiles, isLibraryOpen, toggleLibrary, setCurrentAudioFile } =
    useNav();

  const handleFileClick = (audioFile: AudioFile) => {
    const fileUrl = `${audioFile.url}`;
    setCurrentAudioFile({ ...audioFile, url: fileUrl });
  };

  return (
    <div className={`${styles.audioList} ${isLibraryOpen ? styles.open : ''}`}>
      <h2>
        Library
        <span onClick={toggleLibrary}>✖</span>
      </h2>
      <ul>
        {audioFiles.map((audio, index) => (
          <li
            key={index}
            onClick={() => handleFileClick(audio)}
            className={styles.audioListItem}
          >
            <img
              src={defaultAlbumArt}
              alt='Album Art'
              className={styles.thumbnail}
            />
            <div className={styles.info}>
              <span className={styles.name}>{audio.title}</span>
              <span className={styles.artist}>{audio.artist}</span>
              <span className={styles.album}>{audio.album}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioList;
