import { useNav } from '../../store/NavContext';
import styles from './AudioListStyles.module.css';

const AudioList = () => {
  const { audioFiles, isLibraryOpen } = useNav();
  console.log('audio', audioFiles);

  return (
    <div className={`${styles.audioList} ${isLibraryOpen ? styles.open : ''}`}>
      <h2>Library</h2>
      <ul>
        {audioFiles.map((file, index) => (
          <li key={index}>
            <span>{file.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioList;
