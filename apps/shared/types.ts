export interface User {
  username: string;
  depositCount: number;
  registrationDate: string;
  country: string;
  isKYCApproved: boolean;
  currentBalance: number;
}

export interface Bonus {
  id: string;
  name: { en: string; ar: string };
  description?: { en?: string; ar?: string };
  eligibilityRule: string; 
  brand: 'cosmoswin' | 'betfinal';
}
