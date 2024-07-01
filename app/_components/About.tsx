import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import styles from '../_styles/About.module.scss';

const About = ({ lang }: { lang: string }) => {
  const [texts, setTexts] = useState<any>({});

  useEffect(() => {
    const getTexts = async () => {
      const Texts = await import('../utils/about.json');
      setTexts(Texts);
    };
    getTexts();
  }, []);

  return (
    <section className={styles.about}>
      <Suspense fallback={<p>...</p>}>
        {texts.about && (
          <div className={styles.description} id='about'>
            <h1>{texts.about?.title[lang]}</h1>
            <p>
              {texts.about?.description?.p0[lang]}
              <span style={{ color: '#ec1622' }}>Ruby on Rails, </span>
              <span style={{ color: '#1c2c4c' }}>React, </span>
              <span style={{ color: '#f1dd35' }}>Typescript </span>
              {texts.about?.and[lang]}
              <span style={{ color: 'black' }}>Next.js </span>
            </p>
            <p>{texts.about?.description?.p1[lang]}</p>
            <p>
              {texts.about?.description?.p7[lang]}
              <span>Cruz Azul</span>
              {texts.about?.description?.p8[lang]}
            </p>
          </div>
        )}
        <div className={styles.images}>
          <Image
            src='https://i.imgur.com/yzunC8n.jpeg'
            alt='The Great Wave off Kanagawa'
            width={200}
            height={200}
            className={styles.placeholder}
            priority
          />
          <Image
            src='https://i.imgur.com/quOWh6K.jpeg'
            alt='Nacho Betancourt'
            width={200}
            height={200}
            className={styles.profile}
          />
        </div>
      </Suspense>
    </section>
  );
};

export default About;
