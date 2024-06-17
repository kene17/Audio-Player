import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
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

  const fetchAudioFiles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/audios`);
      if (!response.ok) {
        throw new Error('Failed to fetch audio files');
      }
      const data = await response.json();
      setAudioFiles(data);
    } catch (error) {
      console.error('Failed to load audio files:', error);
    }
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    fetchAudioFiles();
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
