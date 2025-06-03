'use client';

import Link from 'next/link';


export default function Home() {

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#d4af37',
        fontFamily: '"Georgia", serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
        Welcome to Betfinal
      </h1>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%', maxWidth: '300px' }}>
        <li>
          <Link
            href="/login"
            style={{
              display: 'block',
              padding: '0.75rem 1.5rem',
              border: '2px solid #d4af37',
              color: '#d4af37',
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderRadius: '0',
              transition: 'background-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4af37';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#d4af37';
            }}
          >
Login
          </Link>
        </li>
      </ul>
    </main>
  );
}
