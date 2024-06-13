import styles from './AudioInfoStyles.module.css';
import photo1 from '../../assets/photo1.jpg';

const AudioInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.audioContainer}>
        <h1>Now Playing</h1>
        <img
          src={photo1}
          className={styles.albumImage}
        />
        <h2>Song Name</h2>
        <h3>Artist Name</h3>
      </div>
    </div>
  );
};

export default AudioInfo;
