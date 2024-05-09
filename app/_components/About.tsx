import Image from 'next/image';
import { Suspense } from 'react';
import styles from '../_styles/About.module.scss';

const About = ({ lang, texts }: { lang: string; texts: any }) => {
  return (
    <section className={styles.about}>
      <Suspense fallback={<p>...</p>}>
        {texts.about && (
          <div className={styles.description}>
            <h1>{texts.about?.title[lang]}</h1>
            <p>
              {texts.about?.description?.p0[lang]}
              <span>Ruby on Rails, </span>
              <span>React, </span>
              <span>Typescript </span>
              {texts.about?.and[lang]}
              <span>Next.js </span>
            </p>
            <p>{texts.about?.description?.p1[lang]}</p>
            <p>
              {texts.about?.description?.p2[lang]}
              <span>JS </span>
              {texts.about?.and[lang]}
              <span style={{ color: '#EC1622' }}>Ruby on Rails </span>
              {texts.about?.in[lang]}
              <span>{'{'}</span>
              <span>Codea</span>
              <span>Camp</span>
              <span>{'}'}</span>
              {texts.about?.description?.p3[lang]}
            </p>
            <p>
              {texts.about?.description?.p4[lang]}
              <span style={{ color: '#C1002F' }}>Angular </span>
              {texts.about?.in[lang]}
              <span style={{ color: '#721D91' }}>iVoy</span>
              {texts.about?.description?.p5[lang]}
            </p>
            <p>{texts.about?.description?.p6[lang]}</p>
            <p>
              {texts.about?.description?.p7[lang]}
              <span>Cruz Azul</span>
              {texts.about?.description?.p8[lang]}
            </p>
          </div>
        )}
        <Image
          src='https://i.imgur.com/yzunC8n.jpeg'
          alt='The Great Wave off Kanagawa'
          width={200}
          height={200}
        />
      </Suspense>
    </section>
  );
};

export default About;
