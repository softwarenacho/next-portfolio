import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { cookieLanguage, setCookieLanguage } from '../_actions/language';
import About from './About';
import Contact from './Contact';
import Header from './Header';
import ProjectModal from './ProjectModal';
import Projects from './Projects';

export type Languages = {
  [key: string]: string;
  es: string;
  en: string;
};

export type ProjectsInterface = {
  title: Languages;
  projects: Project[];
};

export type Project = {
  images: string[];
  title: Languages;
  tag: string;
  description: Languages;
  cta: {
    link: string;
    label: string;
  }[];
};

const Page = () => {
  const [projects, setProjects] = useState<ProjectsInterface | null>(null);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>('es');
  const [project, setProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const searchParams = useSearchParams();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filteredProjects = useCallback(
    () =>
      projects?.projects.filter((project) =>
        filter === 'All' ? true : project.tag === filter,
      ),
    [filter, projects?.projects],
  );

  const changeLanguage = (lang: string) => {
    setLanguage(lang || 'es');
    setCookieLanguage(lang || 'es');
  };

  const changeProject = (project: Project, index: number) => {
    setProject(project);
  };

  const randomImage = (project: Project) => {
    const randomIndex = Math.floor(Math.random() * project.images.length);
    return project.images[randomIndex];
  };

  const handleMouseEnter = (index: number, project: Project) => {
    const newImage = randomImage(project);
    setCurrentImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = newImage;
      return updatedImages;
    });
  };

  useEffect(() => {
    const setLng = async () => {
      const lang = await cookieLanguage();
      setLanguage(lang?.value || 'es');
    };
    const urlLang =
      searchParams.get('lng') ||
      searchParams.get('lang') ||
      searchParams.get('language') ||
      '';
    if (urlLang && ['en', 'es'].includes(urlLang)) {
      changeLanguage(urlLang);
    } else {
      setLng();
    }
  }, [searchParams]);

  useEffect(() => {
    const getProjects = async () => {
      const Projects = await import('../utils/projects.json');
      setProjects(Projects as ProjectsInterface);
      if (Projects) {
        const initialImages = Projects.projects.map((project: Project) =>
          randomImage(project),
        );
        setCurrentImages(initialImages);
      }
    };
    getProjects();
  }, []);

  return (
    <>
      <Header lang={language} changeLanguage={changeLanguage} />
      <About lang={language} />
      <Projects
        lang={language}
        setProject={changeProject}
        projects={projects as ProjectsInterface}
        handleMouseEnter={handleMouseEnter}
        handleFilterChange={handleFilterChange}
        currentImages={currentImages}
        filter={filter}
        filteredProjects={filteredProjects() as Project[]}
      />
      <Contact lang={language} />
      {project && (
        <ProjectModal
          lang={language}
          projects={filteredProjects() as Project[]}
          project={project}
          setProject={setProject}
        />
      )}
    </>
  );
};

export default Page;
