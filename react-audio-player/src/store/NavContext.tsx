import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

type NavProviderProps = {
  isLibraryOpen: boolean;
  toggleLibrary: () => void;
  theme: string;
  toggleTheme: () => void;
  audioFile: File | null;
  setAudioFile: (file: File | null) => void;
  audioFiles: File[];
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
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);

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

  const addAudioFile = (file: File) => {
    setAudioFiles((prev) => [...prev, file]);
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
