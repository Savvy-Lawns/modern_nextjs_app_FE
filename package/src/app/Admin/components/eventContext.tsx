// Create a file named EventContext.tsx

import React, { createContext, useContext, useState } from 'react';

type EventContextType = {
  Event: any; // Define a more specific type based on your Event data structure
  setEvent: React.Dispatch<React.SetStateAction<any>>; // Same here for the specific type
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEventContext must be used within a EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [Event, setEvent] = useState<any>(null); // Use a more specific initial state if needed

  return (
    <EventContext.Provider value={{ Event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};