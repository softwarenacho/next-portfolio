import Image from 'next/image';
import { Suspense } from 'react';
import styles from '../_styles/Projects.module.scss';
import { Project, ProjectsInterface } from './Page';

const Projects = ({
  lang,
  setProject,
  handleMouseEnter,
  handleFilterChange,
  currentImages,
  projects,
  filter,
  filteredProjects,
}: {
  lang: string;
  setProject: (project: Project, index: number) => void;
  handleMouseEnter: (index: number, project: Project) => void;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  currentImages: string[];
  projects: ProjectsInterface;
  filter: string;
  filteredProjects: Project[];
}) => {
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
                    onClick={() => setProject(project, index)}
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
