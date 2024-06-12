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
  return (
    <NavContext.Provider
      value={{ theme, isLibraryOpen, toggleLibrary, toggleTheme }}
    >
      {children}
    </NavContext.Provider>
  );
};
