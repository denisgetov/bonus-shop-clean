'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Welcome to Betfinal</h1>

      <ul className={styles.linkList}>
        <li>
          <Link href="/login" className={styles.primaryLink}>
            Login
          </Link>
        </li>
      </ul>
    </main>
  );
}
