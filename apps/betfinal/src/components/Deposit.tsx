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
      <p style={{ color: '#d4af37', textAlign: 'center', marginTop: '2rem' }}>
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
        maxWidth: 400,
        margin: '2rem auto',
        padding: '2rem',
        border: '2px solid #d4af37',
        borderRadius: 0,
        backgroundColor: '#000000',
        color: '#d4af37',
        fontFamily: '"Arial", sans-serif',
        textAlign: 'center',
      }}
    >
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Deposit Money</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
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
            width: '150px',
            textAlign: 'center',
          }}
          min="0"
        />
        <button
          onClick={handleDeposit}
          style={{
            padding: '0.75rem 1.5rem',
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
        <p style={{ color: '#ff4d4f', fontWeight: 'bold', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      {/* Success Message */}
      {success && (
        <p style={{ color: '#4caf50', fontWeight: 'bold', marginBottom: '1rem' }}>
          {success}
        </p>
      )}

      <div style={{ fontSize: '1.1rem' }}>
        <p>
          <strong>Balance:</strong> ${user.currentBalance.toFixed(2)}
        </p>
        <p>
          <strong>Deposits made:</strong> {user.depositCount}
        </p>
      </div>
    </div>
  );
};

export default Deposit;
