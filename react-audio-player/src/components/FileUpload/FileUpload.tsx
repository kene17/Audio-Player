import React, { ChangeEvent } from 'react';
import { useNav } from '../../store/NavContext';
import styles from './FileUploadStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { uploadAudioFile } from '../../api/apiClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const FileUpload: React.FC = () => {
  const { addAudioFile } = useNav();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const audioData = await uploadAudioFile(file);
      const fileUrl = `${API_BASE_URL}${audioData.url}`;
      addAudioFile({ ...audioData, url: fileUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
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
