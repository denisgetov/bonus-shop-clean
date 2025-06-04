'use client';

import { useState } from 'react';
import { useUser } from '@/context/userContext';
import styles from './components.module.css';

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
    <div className={styles.loginContainer}>
      {!user ? (
        <>
          <h2 className={styles.loginHeading}>Login to Betfinal</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputField}
          />
          <button
            onClick={handleLogin}
            className={styles.loginButton}
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
          </button>
          {error && <p className={styles.errorText}>{error}</p>}
        </>
      ) : (
        <p className={styles.welcomeMessage}>
          Welcome, <strong>{user.username}</strong>!
        </p>
      )}
    </div>
  );
};

export default Login;
