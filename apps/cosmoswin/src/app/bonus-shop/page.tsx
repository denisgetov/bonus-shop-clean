'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import bonusesRaw from 'shared/data/bonuses.json';
import { Bonus } from 'shared/types';

interface ExtendedBonus extends Bonus {
  requiresKYC: boolean;
  depositCountMin?: number;
  depositCountMax?: number;
  balanceMustBeZero?: boolean;
  registrationWithinLastDays?: number;
  availableCountries?: string[];
}

const isWithinLastDays = (dateString: string, days: number) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffTime = now.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);
  return diffDays <= days;
};

export default function BetfinalBonusShopPage() {
  const { user } = useUser();
  const [claimedBonuses, setClaimedBonuses] = useState<string[]>([]);

  if (!user) {
    return (
      <p
        style={{
          color: '#00ffff',
          textAlign: 'center',
          marginTop: '2rem',
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        }}
      >
        Please log in to view your bonuses.
      </p>
    );
  }

  const isValidBonus = (bonus: any): bonus is ExtendedBonus => {
    return (
      typeof bonus.id === 'string' &&
      typeof bonus.brand === 'string' &&
      typeof bonus.name?.en === 'string' &&
      typeof bonus.description?.en === 'string' &&
      typeof bonus.requiresKYC === 'boolean'
    );
  };

  const bonuses = (bonusesRaw as any[]).filter(isValidBonus);

  const isBonusEligible = (bonus: ExtendedBonus) => {
    // Here change brand to 'betfinal'
    if (bonus.brand !== 'betfinal') return false;

    if (bonus.availableCountries && bonus.availableCountries.length > 0) {
      if (!bonus.availableCountries.includes(user.country)) {
        return false;
      }
    }

    if (
      typeof bonus.depositCountMin === 'number' &&
      user.depositCount < bonus.depositCountMin
    ) {
      return false;
    }

    if (
      typeof bonus.depositCountMax === 'number' &&
      user.depositCount > bonus.depositCountMax
    ) {
      return false;
    }

    if (bonus.requiresKYC && !user.isKYCApproved) {
      return false;
    }

    if (bonus.balanceMustBeZero && user.currentBalance !== 0) {
      return false;
    }

    if (
      typeof bonus.registrationWithinLastDays === 'number' &&
      !isWithinLastDays(user.registrationDate, bonus.registrationWithinLastDays)
    ) {
      return false;
    }

    return true;
  };

  const eligibleBonuses = bonuses.filter(isBonusEligible);

  const handleClaim = (bonusId: string) => {
    if (!claimedBonuses.includes(bonusId)) {
      setClaimedBonuses((prev) => [...prev, bonusId]);
      alert(`Bonus "${bonuses.find((b) => b.id === bonusId)?.name.en}" claimed!`);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '2rem auto',
        padding: '2rem',
        borderRadius: '12px',
        background: 'transparent',
        color: '#ededed',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        boxShadow:
          '0 4px 10px rgba(106, 13, 173, 0.6), 0 6px 20px rgba(0, 255, 255, 0.3)',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          textShadow: '0 0 8px #00ffff',
        }}
      >
        Betfinal Bonus Shop
      </h1>
      {eligibleBonuses.length > 0 ? (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1rem',
          }}
        >
          {eligibleBonuses.map((bonus) => (
            <li
              key={bonus.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '1rem 1.5rem',
                boxShadow: '0 2px 8px rgba(0, 255, 255, 0.3)',
                transition: 'transform 0.3s ease',
                cursor: 'default',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div>
                <strong style={{ fontSize: '1.25rem' }}>{bonus.name.en}</strong>
                {bonus.description?.en && (
                  <p style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: '#b2ffff' }}>
                    {bonus.description.en}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleClaim(bonus.id)}
                disabled={claimedBonuses.includes(bonus.id)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: claimedBonuses.includes(bonus.id)
                    ? 'rgba(106, 13, 173, 0.5)'
                    : '#6a0dad',
                  color: '#ededed',
                  cursor: claimedBonuses.includes(bonus.id) ? 'default' : 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!claimedBonuses.includes(bonus.id)) {
                    e.currentTarget.style.backgroundColor = '#9400d3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!claimedBonuses.includes(bonus.id)) {
                    e.currentTarget.style.backgroundColor = '#6a0dad';
                  }
                }}
              >
                {claimedBonuses.includes(bonus.id) ? 'Claimed' : 'Claim'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            color: '#00ffff',
            textAlign: 'center',
            fontStyle: 'italic',
            marginTop: '1rem',
          }}
        >
          No bonuses available for you right now.
        </p>
      )}
    </div>
  );
}
