import { useNav } from '../../store/NavContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './NavbarStyles.module.css';

const Navbar = () => {
  const { isLibraryOpen, toggleLibrary } = useNav();
  return (
    <>
      <nav className={styles.nav}>
        <h1>Staccato Audio Player</h1>
        <button onClick={toggleLibrary}>
          <FontAwesomeIcon
            icon={isLibraryOpen ? faChevronLeft : faBars}
            size='2x'
          />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
