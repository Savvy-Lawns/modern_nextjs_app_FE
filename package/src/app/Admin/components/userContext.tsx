// Create a file named UserContext.tsx

import React, { createContext, useContext, useState } from 'react';

type UserContextType = {
  User: any; // Define a more specific type based on your user data structure
  setUser: React.Dispatch<React.SetStateAction<any>>; // Same here for the specific type
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [User, setUser] = useState<any>(null); // Use a more specific initial state if needed

  return (
    <UserContext.Provider value={{ User, setUser }}>
      {children}
    </UserContext.Provider>
  );
};