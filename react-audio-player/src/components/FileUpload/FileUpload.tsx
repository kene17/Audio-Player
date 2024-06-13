import React from 'react';
import styles from './FileUploadStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useNav } from '../../store/NavContext';
const FileUpload = () => {
  const { addAudioFile } = useNav();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      addAudioFile(file);
    }
  };
  return (
    <div className={styles.fileUploadContainer}>
      <input
        type='file'
        id='fileUpload'
        className={styles.fileInput}
        accept='audio/*'
        onChange={handleFileChange}
      />
      <label
        htmlFor='fileUpload'
        className={styles.fileLabel}
      >
        <FontAwesomeIcon
          icon={faUpload}
          size='2x'
        />
        <span>Upload Audio</span>
      </label>
    </div>
  );
};

export default FileUpload;
