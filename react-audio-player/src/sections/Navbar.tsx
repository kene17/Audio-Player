import { useNav } from '../store/NavContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faChevronLeft,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { isLibraryOpen, theme, toggleLibrary, toggleTheme } = useNav();
  return (
    <>
      <nav>
        <h1>Staccato Audio Player</h1>
        <button onClick={toggleLibrary}>
          <FontAwesomeIcon
            icon={isLibraryOpen ? faChevronLeft : faBars}
            size='2x'
          />
        </button>
        <button onClick={toggleTheme}>
          <FontAwesomeIcon
            icon={theme === 'dark' ? faSun : faMoon}
            size='2x'
          />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
