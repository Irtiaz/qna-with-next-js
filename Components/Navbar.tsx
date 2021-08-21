import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Navbar.module.css';

import logoImage from './logo.png';

export const Navbar: React.FC<{}> = () => {
  const navLinks: { text: string; href: string }[] = [
    {
      text: 'Home',
      href: '#',
    },
    {
      text: 'Admin',
      href: '#',
    },
    {
      text: 'Login',
      href: '#',
    },
  ];

  return (
    <header className={styles.navHeader}>
      <h1 className={styles.logo}>
        <Link href='/'>
          <a>
            <Image src={logoImage} alt='logo' />
          </a>
        </Link>
      </h1>
      <input type='checkbox' className={styles.navToggle} id='navToggle' />
      <nav>
        <ul>
          {navLinks.map((navLink) => (
            <li key={navLink.text}>
              <Link href={navLink.href}>
                <a>{navLink.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <label htmlFor='navToggle' className={styles.navToggleLabel}>
        <span></span>
      </label>
    </header>
  );
};
