'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';

const Deposit = () => {
  const { user, deposit } = useUser();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return (
      <p style={{ color: '#6a11cb', textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>
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
        maxWidth: '420px',
        margin: '3rem auto',
        padding: '2.5rem',
        background: 'transparent',
        borderRadius: '16px',
        border: '2px solid transparent',
        boxShadow: '0 0 20px rgba(0, 224, 255, 0.3)',
        color: '#e0f7fa',
        fontFamily: 'Segoe UI, sans-serif',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#00e0ff' }}>
        💰 Deposit Funds
      </h2>

      <div style={{ marginBottom: '1.25rem' }}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            borderRadius: '10px',
            border: '2px solid #00e0ff',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: '#00e0ff',
            outline: 'none',
            marginBottom: '1rem',
            transition: 'border-color 0.2s ease',
          }}
        />

        <button
          onClick={handleDeposit}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #00e0ff, #6a11cb)',
            color: '#121230',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 0 10px #00e0ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Deposit
        </button>
      </div>

      {error && (
        <p style={{ color: '#ff6f91', fontWeight: 'bold', marginBottom: '1rem' }}>{error}</p>
      )}

      {success && (
        <p style={{ color: '#00ff9d', fontWeight: 'bold', marginBottom: '1rem' }}>{success}</p>
      )}

      <div style={{ textAlign: 'left', fontSize: '1rem', lineHeight: '1.6', color: '#b2ebf2' }}>
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
