'use client';

/**
 * DEPRECATED: VendorContext
 * 
 * This context was previously used to manage vendor credit balance.
 * As of the latest update, vendor credit balance functionality has been removed.
 * 
 * This file is kept for backward compatibility but is no longer used.
 * Please use AuthContext for user information instead.
 */

import React, { createContext, useContext } from 'react';

interface VendorContextType {
  // Placeholder - context is deprecated
  [key: string]: never;
}

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const VendorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value: VendorContextType = {};
  return (
    <VendorContext.Provider value={value}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (context === undefined) {
    throw new Error('useVendor must be used within VendorProvider');
  }
  return context;
};
