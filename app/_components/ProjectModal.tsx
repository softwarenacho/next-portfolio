import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from '../_styles/ProjectModal.module.scss';
import { Project } from './Projects';

const ProjectModal = ({
  lang,
  project,
  setProject,
}: {
  lang: string;
  project: Project;
  setProject: Dispatch<SetStateAction<Project | null>>;
}) => {
  const galleryImages = project.images.map((img: string) => {
    return {
      original: img,
      thumbnail: img,
    };
  });

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
        <ImageGallery
          items={galleryImages}
          lazyLoad
          showPlayButton={false}
          showFullscreenButton={false}
        />
        <p>{project.description[lang]}</p>
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
    </article>
  );
};

export default ProjectModal;
