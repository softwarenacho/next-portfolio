import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import styles from '../_styles/Header.module.scss';

const Header = ({
  lang,
  setLanguage,
}: {
  lang: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}) => {
  const banner = (
    <pre>
      {`
        __              __  _                                                   _                 ____  
       / / ___   ___   / _|| |_ __      __ __ _  _ __  ___  _ __    __ _   ___ | |__    ___      / /\\ \\ 
      / / / __| / _ \\ | |_ | __|\\ \\ /\\ / // _\` || '__|/ _ \\| '_ \\  / _\` | / __|| '_ \\  / _ \\    / /  \\ \\
      \\ \\ \\__ \\| (_) ||  _|| |_  \\ V  V /| (_| || |  |  __/| | | || (_| || (__ | | | || (_) |  / /   / /
       \\_\\|___/ \\___/ |_|   \\__|  \\_/\\_/  \\__,_||_|   \\___||_| |_| \\__,_| \\___||_| |_| \\___/  /_/   /_/ 
      `}
    </pre>
  );

  return (
    <header className={styles.header}>
      <div className={styles.banner}>{banner}</div>
      <div className={styles.buttons}>
        <a href='#about' className={styles.about}>
          <Image
            src={'/icons/information.png'}
            alt='about'
            width={24}
            height={24}
          />
        </a>
        <a href='#projects' className={styles.projects}>
          <Image src={'/icons/code.png'} alt='about' width={24} height={24} />
        </a>
        <a href='#contact' className={styles.contact}>
          <Image
            src={'/icons/driving-license.png'}
            alt='about'
            width={24}
            height={24}
          />
        </a>
        {lang === 'es' && (
          <button onClick={() => setLanguage('en')}>
            {lang}
            <Image src={'/icons/es.png'} alt='spanish' width={16} height={16} />
          </button>
        )}
        {lang === 'en' && (
          <button onClick={() => setLanguage('es')}>
            {lang}
            <Image src={'/icons/en.png'} alt='english' width={16} height={16} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
