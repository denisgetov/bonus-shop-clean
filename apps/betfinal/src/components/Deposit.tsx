'use client';

import { useState } from 'react';
import { useUser } from '@/context/userContext';
import styles from './components.module.css';

const Deposit = () => {
  const { user, deposit } = useUser();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return (
      <p className={styles.loginReminder}>
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
      <h2 className={styles.depositHeading}>Deposit Money</h2>

      <div className={styles.depositForm}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.depositInput}
          min="0"
          onFocus={(e) => (e.currentTarget.style.borderColor = '#ffffff')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#d4af37')}
        />
        <button
          onClick={handleDeposit}
          className={styles.depositButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#d4af37';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#d4af37';
          }}
        >
          Deposit
        </button>
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
      {success && <p className={styles.successText}>{success}</p>}

      <div className={styles.userInfo}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <p><strong>Registration Date:</strong> {user.registrationDate}</p>
        <p><strong>Deposits made:</strong> {user.depositCount}</p>
        <p><strong>Balance:</strong> ${user.currentBalance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Deposit;
