import React, { ChangeEvent } from 'react';
import { useNav } from '../../store/NavContext';
import styles from './FileUploadStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const FileUpload: React.FC = () => {
  const { addAudioFile } = useNav();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/audios`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const audioData = await response.json();
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
