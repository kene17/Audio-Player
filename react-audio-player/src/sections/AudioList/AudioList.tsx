import { useNav } from '../../store/NavContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './AudioListStyles.module.css';

const AudioList = () => {
  const { audioFiles, isLibraryOpen, setAudioFile, toggleLibrary } = useNav();

  const handleFileClick = (file: File) => {
    setAudioFile(file);
    console.log(`Selected file: ${file.name}`);
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
        {audioFiles.map((file, index) => (
          <li
            key={index}
            onClick={() => handleFileClick(file)}
          >
            <img
              src='/path/to/thumbnail.jpg'
              alt='thumbnail'
            />
            <div className='info'>
              <span className='name'>{file.name}</span>
              <span className='artist'>Artist Name</span>{' '}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioList;
