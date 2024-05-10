'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cookieLanguage, setCookieLanguage } from './_actions/language';
import About from './_components/About';
import Contact from './_components/Contact';
import Header from './_components/Header';
import ProjectModal from './_components/ProjectModal';
import Projects, { Project } from './_components/Projects';
import styles from './_styles/page.module.scss';

export default function Home() {
  const [language, setLanguage] = useState<string>('es');
  const [project, setProject] = useState<Project | null>(null);
  const searchParams = useSearchParams();

  const changeLanguage = (lang: string) => {
    setLanguage(lang || 'es');
    setCookieLanguage(lang || 'es');
  };

  useEffect(() => {
    const setLng = async () => {
      const lang = await cookieLanguage();
      setLanguage(lang?.value || 'es');
    };
    const urlLang =
      searchParams.get('lang') || searchParams.get('language') || '';
    if (urlLang && ['en', 'es'].includes(urlLang)) {
      changeLanguage(urlLang);
    } else {
      setLng();
    }
  }, [searchParams]);

  return (
    <main className={styles.main}>
      <Header lang={language} changeLanguage={changeLanguage} />
      <About lang={language} />
      <Projects lang={language} setProject={setProject} />
      <Contact lang={language} />
      {project && (
        <ProjectModal
          lang={language}
          project={project}
          setProject={setProject}
        />
      )}
    </main>
  );
}
