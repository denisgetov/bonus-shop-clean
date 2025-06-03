'use client';

import { useUser } from '@/context/UserContext';
import bonusesRaw from 'shared/data/bonuses.json';
import { filterBonuses } from 'shared/utils/bonusFilter';
import { Bonus } from 'shared/types';

export default function BonusShopPage() {
  const { user } = useUser();

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

  const isValidBonus = (bonus: any): bonus is Bonus => {
    return (
      typeof bonus.id === 'string' &&
      typeof bonus.brand === 'string' &&
      typeof bonus.name?.en === 'string' &&
      typeof bonus.description?.en === 'string' &&
      typeof bonus.requiresKYC === 'boolean'
    );
  };

  const bonuses = (bonusesRaw as any[]).filter(isValidBonus);
  const eligibleBonuses = filterBonuses(user, bonuses, 'cosmoswin');

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '2rem auto',
        padding: '2rem',
        borderRadius: '12px',
        background:
          'transparent',
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
        Bonus Shop
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
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.03)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <strong style={{ fontSize: '1.25rem' }}>{bonus.name.en}</strong>
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
