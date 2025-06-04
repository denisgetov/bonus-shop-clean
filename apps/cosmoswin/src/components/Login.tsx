'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
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
          <h2 className={styles.loginTitle}>Login to Cosmoswin</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.loginInput}
          />
          <button
            onClick={handleLogin}
            className={styles.loginButton}
            onMouseEnter={(e) => {
              e.currentTarget.classList.add(styles.hovered);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.classList.remove(styles.hovered);
            }}
          >
            Login
          </button>
          {error && (
            <p className={styles.loginError}>
              {error}
            </p>
          )}
        </>
      ) : (
        <p className={styles.loginWelcome}>
          Welcome, <strong>{user.username}</strong>!
        </p>
      )}
    </div>
  );
};

export default Login;
