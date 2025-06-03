import type { User, Bonus } from '../types'; // 

export function filterBonuses(user: User, bonuses: Bonus[], brand: 'cosmoswin' | 'betfinal') {
  if (brand === 'cosmoswin') {
    // For Cosmoswin, user must be KYC approved
    return bonuses.filter(bonus => user.isKYCApproved && bonus.brand === 'cosmoswin');
  }
  if (brand === 'betfinal') {
    // For Betfinal, no KYC needed
    return bonuses.filter(bonus => bonus.brand === 'betfinal');
  }
  return [];
}
