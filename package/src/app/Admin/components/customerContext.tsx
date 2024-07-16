// Create a file named CustomerContext.tsx

import React, { createContext, useContext, useState } from 'react';

type CustomerContextType = {
  Customer: any; // Define a more specific type based on your customer data structure
  setCustomer: React.Dispatch<React.SetStateAction<any>>; // Same here for the specific type
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [Customer, setCustomer] = useState<any>(null); // Use a more specific initial state if needed

  return (
    <CustomerContext.Provider value={{ Customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};