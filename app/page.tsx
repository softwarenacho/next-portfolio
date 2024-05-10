'use client';

import { Suspense } from 'react';
import Page from './_components/Page';
import styles from './_styles/PageInitial.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<p>...</p>}>
        <Page />
      </Suspense>
    </main>
  );
}
