'use client';

import Login from '@/components/Login';
import Deposit from '@/components/Deposit';
import BonusShopPage from '@/app/bonus-shop/page'; 
import { useUser } from '@/context/UserContext';

export default function LoginPage() {
  const { user } = useUser();

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6a0dad, #00ffff)', 
        color: '#ededed',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          padding: '0', 
          minHeight: '80vh',
        }}
      >
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
