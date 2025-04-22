import React, { createContext, useContext, useState } from 'react';

interface IntervalContextType {
  interval: number;
  setInterval: (interval: number) => void;
}

const IntervalContext = createContext<IntervalContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useInterval = () => {
  const context = useContext(IntervalContext);
  if (!context) {
    throw new Error('useInterval должен использоваться с IntervalProvider');
  }
  return context;
};

export const IntervalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interval, setInterval] = useState(60);

  return (
    <IntervalContext.Provider value={{ interval, setInterval }}>
      {children}
    </IntervalContext.Provider>
  );
};
