'use client';

import Login from '@/components/Login';
import Deposit from '@/components/Deposit';
import BonusShopPage from '@/app/bonus-shop/page'; 
import { useUser } from '@/context/userContext';

export default function LoginPage() {
  const { user } = useUser();

  return (
    <main style={{ padding: '2rem' }}>
      <Login />
      {user && (
        <>
          <Deposit />
          <BonusShopPage /> {/* Show bonus shop only when logged in same goes for Deposit */}
        </>
      )}
    </main>
  );
}
