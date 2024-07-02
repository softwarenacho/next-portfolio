import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from '../_styles/ProjectModal.module.scss';
import { Project } from './Page';

const ProjectModal = ({
  lang,
  project,
  setProject,
  projects,
}: {
  lang: string;
  project: Project;
  projects: Project[];
  setProject: Dispatch<SetStateAction<Project | null>>;
}) => {
  const galleryImages = project.images.map((img: string) => {
    return {
      original: img,
      thumbnail: img,
    };
  });

  const changeProject = (direction: 'next' | 'prev') => {
    const currentIndex = projects.findIndex((p) => p.title === project.title);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    const change = projects[newIndex];
    if (change) {
      setProject(change);
    } else {
      const rotate = projects[direction === 'next' ? 0 : projects.length - 1];
      setProject(rotate);
    }
  };

  return (
    <article className={styles.container}>
      <div className={styles.modal}>
        <h2>{project.title[lang]}</h2>
        <Image
          src='/icons/close.png'
          width={16}
          height={16}
          alt='Close button'
          className={styles.close}
          onClick={() => setProject(null)}
        />
        <div className={styles.gallery}>
          <ImageGallery
            items={galleryImages}
            lazyLoad
            showPlayButton={false}
            showFullscreenButton={false}
          />
        </div>
        <div className={styles.navigation}>
          <span onClick={() => changeProject('prev')}>
            <Image
              src='/icons/arrow.png'
              width={24}
              height={24}
              alt='arrow button'
              className={`${styles.arrow} ${styles.left}`}
            />
          </span>
          <span onClick={() => changeProject('next')}>
            <Image
              src='/icons/arrow.png'
              width={24}
              height={24}
              alt='arrow button'
              className={styles.arrow}
            />
          </span>
        </div>
        <p>{project.description[lang]}</p>
        {!!project.cta.length && (
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
    </article>
  );
};

export default ProjectModal;
