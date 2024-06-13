import { parseBlob } from 'music-metadata-browser';

export const extractMetadata = async (file: File) => {
  try {
    const metadata = await parseBlob(file);

    const title = metadata.common.title || file.name;
    const artist = metadata.common.artist || 'Unknown Artist';
    const album = metadata.common.album || 'Unknown Album';
    const picture = metadata.common.picture
      ? URL.createObjectURL(new Blob([metadata.common.picture[0].data]))
      : null;

    return {
      title,
      artist,
      album,
      picture,
    };
  } catch (error) {
    console.error('Error reading metadata:', error);
    return {
      title: file.name,
      artist: 'Unknown Artist',
      album: 'Unknown Album',
      picture: null,
    };
  }
};
