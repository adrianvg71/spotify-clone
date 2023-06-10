"use client"

import React, { createContext, useContext, useState } from 'react';

interface GlobalStateContextProps {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children
}) => {
  const [volume, setVolume] = useState(1);

  return (
    <GlobalStateContext.Provider value={{ volume, setVolume }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = (): GlobalStateContextProps => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };