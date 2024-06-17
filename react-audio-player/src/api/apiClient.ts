const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const fetchAudioFiles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/audios`);
    if (!response.ok) {
      throw new Error('Failed to fetch audio files');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load audio files:', error);
    throw error;
  }
};

export const uploadAudioFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/api/audios`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`File upload failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
