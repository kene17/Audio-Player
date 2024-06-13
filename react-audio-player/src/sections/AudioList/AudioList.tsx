import { useNav } from '../../store/NavContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './AudioListStyles.module.css';
import defaultAlbumArt from '../../assets/photo1.jpg';

const AudioList = () => {
  const { audioFiles, isLibraryOpen, setAudioFile, toggleLibrary } = useNav();

  const handleFileClick = (file: File) => {
    setAudioFile(file);
  };

  return (
    <div className={`${styles.audioList} ${isLibraryOpen ? styles.open : ''}`}>
      <h2>
        Library
        <span onClick={toggleLibrary}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </h2>
      <ul>
        {audioFiles.map(({ file, metadata }, index) => (
          <li
            key={index}
            onClick={() => handleFileClick(file)}
            className={styles.audioListItem}
          >
            <img
              src={metadata.picture || defaultAlbumArt}
              alt='Album Art'
              className={styles.thumbnail}
            />
            <div className={styles.info}>
              <span className={styles.name}>{metadata.title}</span>
              <span className={styles.artist}>{metadata.artist}</span>
              <span className={styles.album}>{metadata.album}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioList;
