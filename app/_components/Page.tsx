import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cookieLanguage, setCookieLanguage } from '../_actions/language';
import About from './About';
import Contact from './Contact';
import Header from './Header';
import ProjectModal from './ProjectModal';
import Projects, { Project } from './Projects';

const Page = () => {
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
    <>
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
    </>
  );
};

export default Page;
