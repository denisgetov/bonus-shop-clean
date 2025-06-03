'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6a0dad, #00ffff)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Orbitron", sans-serif',
        color: '#ffffff',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
        Welcome to <span style={{ color: '#00ffff' }}>Cosmoswin</span>
      </h1>

      <Link
        href="/login"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#00ffff',
          color: '#6a0dad',
          border: 'none',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '1rem',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#6a0dad';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#00ffff';
          e.currentTarget.style.color = '#6a0dad';
        }}
      >
        Login to Cosmoswin
      </Link>
    </main>
  );
}
