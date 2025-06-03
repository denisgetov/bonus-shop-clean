'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import users from 'shared/data/user-mock-data.json';
import { User } from 'shared/types';

interface UserContextType {
  user: User | null;
  login: (username: string) => void;
  deposit: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string) => {
    const foundUser = users.find(u => u.username === username);
    if (foundUser) setUser({...foundUser});
    else alert('User not found');
  };

  const deposit = (amount: number) => {
    if (!user) return;
    setUser(prevUser => prevUser ? {
      ...prevUser,
      currentBalance: prevUser.currentBalance + amount,
      depositCount: prevUser.depositCount + 1,
    } : null);
  };

  return (
    <UserContext.Provider value={{ user, login, deposit }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};



