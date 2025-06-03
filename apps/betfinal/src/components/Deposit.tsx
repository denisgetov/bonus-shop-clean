'use client';

import { useState } from 'react';
import { useUser } from '@/context/userContext';

const Deposit = () => {
  const { user, deposit } = useUser();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return (
      <p style={{ color: '#d4af37', textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>
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
    <div
      style={{
        maxWidth: 420,
        margin: '3rem auto',
        padding: '2.5rem',
        border: '2px solid #d4af37',
        borderRadius: 0,
        backgroundColor: '#000000',
        color: '#d4af37',
        fontFamily: '"Arial", sans-serif',
        textAlign: 'center',
        boxShadow: '0 0 15px #d4af37',
      }}
    >
      <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem', fontWeight: 'bold' }}>
        Deposit Money
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #d4af37',
            borderRadius: 0,
            backgroundColor: '#121212',
            color: '#d4af37',
            fontSize: '1rem',
            width: '160px',
            textAlign: 'center',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
          min="0"
          onFocus={(e) => (e.currentTarget.style.borderColor = '#fff')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#d4af37')}
        />
        <button
          onClick={handleDeposit}
          style={{
            padding: '0.75rem 1.8rem',
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
          Deposit
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p style={{ color: '#ff4d4f', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          {error}
        </p>
      )}

      {/* Success Message */}
      {success && (
        <p style={{ color: '#4caf50', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          {success}
        </p>
      )}

      <div
        style={{
          textAlign: 'left',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          maxWidth: '300px',
          margin: '0 auto',
          color: '#d4af37',
          userSelect: 'none',
        }}
      >
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
