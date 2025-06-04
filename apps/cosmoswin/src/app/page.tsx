'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.heading}>
        Welcome to <span className={styles.highlight}>Cosmoswin</span>
      </h1>

      <Link href="/login" className={styles.loginButton}>
        Login to Cosmoswin
      </Link>
    </main>
  );
}
