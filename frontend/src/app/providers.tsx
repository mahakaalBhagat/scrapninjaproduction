'use client';

import React from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/context/CartContext';
import { RiderProvider } from '@/context/RiderContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <RiderProvider>
          {children}
        </RiderProvider>
      </CartProvider>
    </AuthProvider>
  );
};

