'use client';

import { useUser } from '@/context/userContext';
import bonusesRaw from 'shared/data/bonuses.json';
import { filterBonuses } from 'shared/utils/bonusFilter';
import { Bonus } from 'shared/types';

export default function BonusShopPage() {
  const { user } = useUser();

  if (!user) {
    return (
      <p style={{ 
        color: '#d4af37', 
        textAlign: 'center', 
        marginTop: '2rem', 
        fontFamily: 'Arial, sans-serif' 
      }}>
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
  const eligibleBonuses = filterBonuses(user, bonuses, 'betfinal');

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#000000',
        color: '#d4af37',
        border: '2px solid #d4af37',
        borderRadius: 0,
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '2rem' }}>
        Bonus Shop
      </h1>

      {eligibleBonuses.length > 0 ? (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {eligibleBonuses.map((bonus) => (
            <li
              key={bonus.id}
              style={{
                borderBottom: '1px solid #d4af37',
                padding: '1rem 0',
                fontSize: '1.2rem',
              }}
            >
              <strong>{bonus.name.en}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
          No bonuses available for you right now.
        </p>
      )}
    </div>
  );
}
