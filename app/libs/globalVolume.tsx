"use client"

import React, { createContext, useContext, useState } from 'react';

interface GlobalStateContextProps {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  previousVolume: number;
  setPreviousVolume: React.Dispatch<React.SetStateAction<number>>;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children
}) => {
  const [volume, setVolume] = useState(() => {
    const volumeFromStorage = window.localStorage.getItem('volume')
    return volumeFromStorage ? Number(volumeFromStorage) : 1
  });
  const [previousVolume, setPreviousVolume] = useState(0);

  return (
    <GlobalStateContext.Provider value={{ volume, setVolume, previousVolume, setPreviousVolume }}>
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