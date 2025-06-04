'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import bonusesRaw from 'shared/data/bonuses.json';
import { Bonus } from 'shared/types';
import styles from './cosmoswinBonusShopPage.module.css';

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
    return <p className={styles.loginMessage}>Please log in to view your bonuses.</p>;
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
    if (bonus.brand !== 'betfinal') return false;

    if (bonus.availableCountries?.length && !bonus.availableCountries.includes(user.country)) {
      return false;
    }

    if (typeof bonus.depositCountMin === 'number' && user.depositCount < bonus.depositCountMin) {
      return false;
    }

    if (typeof bonus.depositCountMax === 'number' && user.depositCount > bonus.depositCountMax) {
      return false;
    }

    if (bonus.requiresKYC && !user.isKYCApproved) return false;
    if (bonus.balanceMustBeZero && user.currentBalance !== 0) return false;

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
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Betfinal Bonus Shop</h1>
      {eligibleBonuses.length > 0 ? (
        <ul className={styles.bonusList}>
          {eligibleBonuses.map((bonus) => (
            <li key={bonus.id} className={styles.bonusItem}>
              <div>
                <strong className={styles.bonusTitle}>{bonus.name.en}</strong>
                {bonus.description?.en && (
                  <p className={styles.bonusDescription}>{bonus.description.en}</p>
                )}
              </div>
              <button
                onClick={() => handleClaim(bonus.id)}
                disabled={claimedBonuses.includes(bonus.id)}
                className={styles.button}
              >
                {claimedBonuses.includes(bonus.id) ? 'Claimed' : 'Claim'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>No bonuses available for you right now.</p>
      )}
    </div>
  );
}
