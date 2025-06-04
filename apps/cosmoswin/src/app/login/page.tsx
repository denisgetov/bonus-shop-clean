'use client';

import Login from '@/components/Login';
import Deposit from '@/components/Deposit';
import BonusShopPage from '@/app/bonus-shop/page'; 
import { useUser } from '@/context/UserContext';
import styles from './login.module.css';

export default function LoginPage() {
  const { user } = useUser();

  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <Login />
        {user && (
          <>
            <Deposit />
            <BonusShopPage /> 
          </>
        )}
      </div>
    </main>
  );
}
