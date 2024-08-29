// Create a file named UserContext.tsx

import React, { createContext, useContext, useState } from 'react';

type ExpenseContextType = {
  Expense: any; // Define a more specific type based on your Expense data structure
  setExpense: React.Dispatch<React.SetStateAction<any>>; // Same here for the specific type
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenseContext must be used within a ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [Expense, setExpense] = useState<any>(null); // Use a more specific initial state if needed

  return (
    <ExpenseContext.Provider value={{ Expense, setExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};