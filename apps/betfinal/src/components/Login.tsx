'use client';

import { useState } from 'react';
import { useUser } from '@/context/userContext';

const Login = () => {
  const { login, user } = useUser();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    try {
      login(username.trim());
      setError('');
    } catch (err) {
      setError('User not found');
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '3rem auto',
        padding: '2rem',
        backgroundColor: '#000000',
        color: '#d4af37',
        border: '2px solid #d4af37',
        borderRadius: 0, 
        fontFamily: '"Arial", sans-serif',
        textAlign: 'center',
      }}
    >
      {!user ? (
        <>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>
            Login to Betfinal
          </h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '2px solid #d4af37',
              borderRadius: 0,
              backgroundColor: '#121212',
              color: '#d4af37',
              fontSize: '1rem',
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #d4af37',
              borderRadius: 0,
              backgroundColor: 'transparent',
              color: '#d4af37',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#d4af37';
              (e.currentTarget as HTMLButtonElement).style.color = '#000000';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = '#d4af37';
            }}
          >
            Login
          </button>
          {error && (
            <p style={{ color: '#ff4d4f', marginTop: '1rem', fontWeight: 'bold' }}>
              {error}
            </p>
          )}
        </>
      ) : (
        <p style={{ fontSize: '1.25rem' }}>
          Welcome, <strong>{user.username}</strong>!
        </p>
      )}
    </div>
  );
};

export default Login;
