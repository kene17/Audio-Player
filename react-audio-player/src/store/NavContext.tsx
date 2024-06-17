import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { fetchAudioFiles } from '../api/apiClient';

export interface AudioFile {
  title: string;
  artist: string;
  album: string;
  url: string;
}

interface NavContextProps {
  theme: string;
  toggleTheme: () => void;
  isLibraryOpen: boolean;
  toggleLibrary: () => void;
  audioFiles: AudioFile[];
  currentAudioFile: AudioFile | null;
  setCurrentAudioFile: (audioFile: AudioFile) => void;
  addAudioFile: (audioFile: AudioFile) => void;
  setAudioFiles: (audioFiles: AudioFile[]) => void;
}

const NavContext = createContext<NavContextProps | undefined>(undefined);

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
};

export const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [currentAudioFile, setCurrentAudioFile] = useState<AudioFile | null>(
    null
  );

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const loadAudioFiles = async () => {
      try {
        const data = await fetchAudioFiles();
        setAudioFiles(data);
      } catch (error) {
        console.error('Failed to load audio files:', error);
      }
    };

    loadAudioFiles();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLibrary = () => {
    setIsLibraryOpen((prev) => !prev);
  };

  const addAudioFile = (audioFile: AudioFile) => {
    setAudioFiles((prev) => [...prev, audioFile]);
    setCurrentAudioFile(audioFile); //This sets the newly added file as the current audio file
  };

  return (
    <NavContext.Provider
      value={{
        theme,
        toggleTheme,
        isLibraryOpen,
        toggleLibrary,
        audioFiles,
        currentAudioFile,
        setCurrentAudioFile,
        addAudioFile,
        setAudioFiles,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
