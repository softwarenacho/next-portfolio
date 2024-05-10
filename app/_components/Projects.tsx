import { Suspense, useEffect, useState } from 'react';
import { Gallery } from 'react-grid-gallery';
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
  width: number;
  height: number;
  cta: {
    link: string;
    repo: string;
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
        return {
          src: project.images[0],
          width: project.width,
          height: project.height,
          customOverlay: (
            <div className='custom-overlay'>
              <h2>{project.title[lang]}</h2>
              {/* <span>{project.description[lang]}</span>
              <span>
                {project.cta.map((cta) => (
                  <div key={project.title[lang]}>
                    {cta.link && <a href={cta.link}>Link</a>}
                    {cta.repo && <a href={cta.repo}>Repo</a>}
                  </div>
                ))}
              </span> */}
            </div>
          ),
        };
      });
      console.log('🚀 ~ galleryImages ~ galleryImages:', galleryImages);
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
            <h1># {projects.title[lang]}</h1>
            <div className={styles.gallery}>
              <Gallery
                rowHeight={400}
                enableImageSelection={false}
                images={images}
              />
            </div>
          </>
        )}
      </Suspense>
    </section>
  );
};

export default Projects;
