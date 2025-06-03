'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';

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
        backgroundColor: 'transparent',
        color: '#00e0ff', // cyan text
        border: '2px solid #00e0ff', // cyan border
        borderRadius: '12px', // rounded corners
        fontFamily: '"Arial", sans-serif',
        textAlign: 'center',
      }}
    >
      <style>
        {`
          input::placeholder {
            color: #00e0ff;
            opacity: 1; /* Firefox */
          }
        `}
      </style>

      {!user ? (
        <>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>
            Login to Cosmoswin
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
              border: '2px solid #00e0ff',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: '#00e0ff',
              fontSize: '1rem',
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #00e0ff',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: '#00e0ff',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#00e0ff';
              (e.currentTarget as HTMLButtonElement).style.color = '#1e1f6a';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = '#00e0ff';
            }}
          >
            Login
          </button>
          {error && (
            <p style={{ color: '#ff6f91', marginTop: '1rem', fontWeight: 'bold' }}>
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
