import { useNav } from '../../store/NavContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './NavbarStyles.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/Staccato Logo.jpg';
const Navbar = () => {
  const { isLibraryOpen, toggleLibrary } = useNav();
  return (
    <>
      <nav className={styles.nav}>
        <Link
          to='/'
          className={styles.homeLink}
        >
          <img
            src={logo}
            className={styles.logo}
            alt='Staccato Logo'
          />
          <h1>Staccato</h1>
        </Link>
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
