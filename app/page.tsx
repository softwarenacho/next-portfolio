import Header from './_components/Header';
import styles from './_styles/page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <section>Web Porfolio of Nacho Betancourt</section>
    </main>
  );
}
