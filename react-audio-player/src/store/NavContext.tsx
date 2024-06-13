import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { extractMetadata } from '../config/config';

interface AudioFileMetadata {
  file: File;
  metadata: {
    title: string;
    artist: string;
    album: string;
    picture: string | null;
  };
}

type NavProviderProps = {
  isLibraryOpen: boolean;
  toggleLibrary: () => void;
  theme: string;
  toggleTheme: () => void;
  audioFile: File | null;
  setAudioFile: (file: File | null) => void;
  audioFiles: AudioFileMetadata[];
  addAudioFile: (file: File) => void;
};

const NavContext = createContext<NavProviderProps | undefined>(undefined);

export const useNav = () => {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
};

export const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioFiles, setAudioFiles] = useState<AudioFileMetadata[]>([]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLibrary = () => {
    setIsLibraryOpen((prev) => !prev);
  };

  const addAudioFile = async (file: File) => {
    const metadata = await extractMetadata(file);
    setAudioFiles((prev) => [...prev, { file, metadata }]);
    setAudioFile(file); // Set the last uploaded file as the current audio file
  };

  return (
    <NavContext.Provider
      value={{
        theme,
        isLibraryOpen,
        toggleLibrary,
        toggleTheme,
        audioFile,
        setAudioFile,
        audioFiles,
        addAudioFile,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
