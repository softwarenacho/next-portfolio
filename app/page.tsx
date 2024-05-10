'use client';

import { useEffect, useState } from 'react';
import { cookieLanguage, setCookieLanguage } from './_actions/language';
import About from './_components/About';
import Header from './_components/Header';
import Projects from './_components/Projects';
import styles from './_styles/page.module.scss';

export default function Home() {
  const [language, setLanguage] = useState<string>('es');

  useEffect(() => {
    const setLng = async () => {
      const lang = await cookieLanguage();
      setLanguage(lang?.value || 'es');
      setCookieLanguage(lang?.value || 'es');
    };
    setLng();
  }, []);

  return (
    <main className={styles.main}>
      <Header lang={language} setLanguage={setLanguage} />
      <About lang={language} />
      <Projects lang={language} />
    </main>
  );
}
