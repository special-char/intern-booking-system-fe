"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Territory {
  id: number;
  name?: string | null;
}

interface TerritoryContextType {
  selectedTerritory: Territory | null;
  setSelectedTerritory: (territory: Territory | null) => void;
}

const TerritoryContext = createContext<TerritoryContextType | undefined>(
  undefined
);

export function TerritoryProvider({ children }: { children: ReactNode }) {
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(
    null
  );

  return (
    <TerritoryContext.Provider
      value={{
        selectedTerritory,
        setSelectedTerritory,
      }}
    >
      {children}
    </TerritoryContext.Provider>
  );
}

export function useTerritory() {
  const context = useContext(TerritoryContext);
  if (context === undefined) {
    throw new Error("useTerritory must be used within a TerritoryProvider");
  }
  return context;
}
