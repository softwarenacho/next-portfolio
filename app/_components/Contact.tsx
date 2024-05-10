import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import styles from '../_styles/Contact.module.scss';

const Contact = ({ lang }: { lang: string }) => {
  const [texts, setTexts] = useState<any>({});

  useEffect(() => {
    const getTexts = async () => {
      const Texts = await import('../utils/about.json');
      setTexts(Texts);
    };
    getTexts();
  }, []);

  return (
    <Suspense fallback={<p>...</p>}>
      <section className={styles.contact} id='contact'>
        <div className={styles.info}>
          <Image
            src='https://i.imgur.com/Lr2XrAS.png'
            alt='Security Image'
            width={400}
            height={400}
          />
          <p>{'"First solve the problem, then write the code"'}</p>
        </div>
        <div className={styles.actions}>
          <h1>{lang === 'es' ? '// Contacto' : '// Contact info'}</h1>
          <div className={styles.links}>
            <a
              href='https://www.linkedin.com/in/softwarenacho'
              target='_blank'
              rel='nofollow'
            >
              <Image
                src='/icons/linkedin.png'
                width={24}
                height={24}
                alt='social icon linkedin'
              />
            </a>
            <a
              href='https://github.com/softwarenacho'
              target='_blank'
              rel='nofollow'
            >
              <Image
                src='/icons/github.png'
                width={24}
                height={24}
                alt='social icon github'
              />
            </a>
            <a
              href='https://www.facebook.com/GarpB'
              target='_blank'
              rel='nofollow'
            >
              <Image
                src='/icons/facebook.png'
                width={24}
                height={24}
                alt='social icon facebook'
              />
            </a>
            <a
              href='https://www.instagram.com/softwarenacho'
              target='_blank'
              rel='nofollow'
            >
              <Image
                src='/icons/instagram.png'
                width={24}
                height={24}
                alt='social icon instagram'
              />
            </a>
            <a
              href='https://twitter.com/softwarenacho'
              target='_blank'
              rel='nofollow'
            >
              <Image
                src='/icons/x.png'
                width={24}
                height={24}
                alt='social icon x'
              />
            </a>
            <a href='mailto:trsgarp@gmail.com' target='_blank' rel='nofollow'>
              <Image
                src='/icons/gmail.png'
                width={24}
                height={24}
                alt='social icon gmail'
              />
            </a>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Contact;
