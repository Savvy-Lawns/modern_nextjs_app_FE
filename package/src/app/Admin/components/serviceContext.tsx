// Create a file named UserContext.tsx

import React, { createContext, useContext, useState } from 'react';

type ServiceContextType = {
  Service: any; // Define a more specific type based on your Service data structure
  setService: React.Dispatch<React.SetStateAction<any>>; // Same here for the specific type
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [Service, setService] = useState<any>(null); // Use a more specific initial state if needed

  return (
    <ServiceContext.Provider value={{ Service, setService }}>
      {children}
    </ServiceContext.Provider>
  );
};