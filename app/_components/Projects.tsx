import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import styles from '../_styles/Projects.module.scss';

type Languages = {
  [key: string]: string;
  es: string;
  en: string;
};

type Project = {
  images: string[];
  title: Languages;
  description: Languages;
  cta: {
    link: string;
    label: string;
  }[];
};

type Projects = {
  title: Languages;
  projects: Project[];
};

const Projects = ({ lang }: { lang: string }) => {
  const [projects, setProjects] = useState<any>({});
  const [images, setImages] = useState<any>(null);

  useEffect(() => {
    if (projects.projects) {
      const galleryImages = projects.projects.map((project: Project) => {
        return (
          <div className={styles.projectCard} key={project.title[lang]}>
            <Image
              src={project.images[0]}
              width={400}
              height={400}
              alt={project.title[lang]}
            />
            <h2>{project.title[lang]}</h2>
            <span className={styles.description}>
              {project.description[lang]}
            </span>
            <div className={styles.links}>
              {project.cta.map((cta, index) => (
                <a
                  key={`links-${project.title[lang]}-${index}`}
                  href={cta.link}
                  rel='nofollow'
                  target='_blank'
                >
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
        );
      });
      setImages(galleryImages);
    }
  }, [lang, projects.projects]);

  useEffect(() => {
    const getProjects = async () => {
      const Projects = await import('../utils/projects.json');
      setProjects(Projects as Projects);
    };
    getProjects();
  }, []);

  return (
    <section id='projects' className={styles.projects}>
      <Suspense fallback={<p>...</p>}>
        {projects.title && images && (
          <>
            <h1>#{projects.title[lang]}</h1>
            <h3>{projects.subtitle[lang]}</h3>
            <div className={styles.gallery}>{images}</div>
          </>
        )}
      </Suspense>
    </section>
  );
};

export default Projects;
