import Image from 'next/image';
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import styles from '../_styles/Projects.module.scss';

export type Languages = {
  [key: string]: string;
  es: string;
  en: string;
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

export type Projects = {
  title: Languages;
  projects: Project[];
};

const Projects = ({
  lang,
  setProject,
}: {
  lang: string;
  setProject: Dispatch<SetStateAction<Project | null>>;
}) => {
  const [projects, setProjects] = useState<Projects | null>(null);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const getProjects = async () => {
      const Projects = await import('../utils/projects.json');
      setProjects(Projects as Projects);
      if (Projects) {
        const initialImages = Projects.projects.map((project: Project) =>
          randomImage(project),
        );
        setCurrentImages(initialImages);
      }
    };
    getProjects();
  }, []);

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filteredProjects = projects?.projects.filter((project) =>
    filter === 'All' ? true : project.tag === filter,
  );

  return (
    <section id='projects' className={styles.projects}>
      <Suspense fallback={<p>...</p>}>
        {projects && (
          <>
            <h1>
              #{projects.title[lang]}
              <select
                className={styles.filter}
                onChange={handleFilterChange}
                value={filter}
              >
                <option value='All'>All</option>
                <option value='game'>Games</option>
                <option value='personal'>Personal</option>
                <option value='work'>Work</option>
              </select>
            </h1>
            <div className={styles.gallery}>
              {filteredProjects?.map((project, index) => (
                <div className={styles.projectCard} key={project.title[lang]}>
                  <div
                    className={styles.imageContainer}
                    onClick={() => setProject(project)}
                    onMouseEnter={() => handleMouseEnter(index, project)}
                    style={{
                      backgroundImage: `url(${currentImages[index]})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <Image
                      src={project.images[0]}
                      width={400}
                      height={400}
                      alt={project.title[lang]}
                      className={styles.projectImage}
                    />
                  </div>
                  <h2>{project.title[lang]}</h2>
                  <span
                    className={`${styles.description} ${
                      project.cta.length > 0 ? '' : styles.longDescription
                    }`}
                  >
                    {project.description[lang]}
                  </span>
                  {project.cta.length > 0 && (
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
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </Suspense>
    </section>
  );
};

export default Projects;
