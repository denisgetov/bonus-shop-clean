'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import styles from './components.module.css';

const Deposit = () => {
  const { user, deposit } = useUser();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return (
      <p className={styles.loginMessage}>
        Please log in to make a deposit.
      </p>
    );
  }

  const handleDeposit = () => {
    const depositAmount = Number(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setError('Please enter a valid positive amount.');
      setSuccess('');
      return;
    }

    deposit(depositAmount);
    setAmount('');
    setError('');
    setSuccess(`Successfully deposited $${depositAmount.toFixed(2)}.`);
  };

  return (
    <div className={styles.depositContainer}>
      <h2 className={styles.heading}>💰 Deposit Funds</h2>

      <div className={styles.inputGroup}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.inputField}
        />

        <button onClick={handleDeposit} className={styles.depositButton}>
          Deposit
        </button>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>{success}</p>}

      <div className={styles.userDetails}>
        <p><strong>👤 Username:</strong> {user.username}</p>
        <p><strong>🌍 Country:</strong> {user.country}</p>
        <p><strong>📅 Registered:</strong> {user.registrationDate}</p>
        <p><strong>📥 Deposits:</strong> {user.depositCount}</p>
        <p><strong>💵 Balance:</strong> ${user.currentBalance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Deposit;
