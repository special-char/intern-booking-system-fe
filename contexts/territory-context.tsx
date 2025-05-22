"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Territory {
  id: number;
  name?: string | null;
}

interface TerritoryContextType {
  territories: Territory[];
  setTerritories: (territories: Territory[]) => void;
  selectedTerritory: Territory | null;
  setSelectedTerritory: (territory: Territory | null) => void;
  applyToAllTerritories: boolean;
  setApplyToAllTerritories: (apply: boolean) => void;
}

const TerritoryContext = createContext<TerritoryContextType | undefined>(
  undefined
);

export function TerritoryProvider({ children }: { children: ReactNode }) {
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(
    null
  );
  const [applyToAllTerritories, setApplyToAllTerritories] = useState(false);

  return (
    <TerritoryContext.Provider
      value={{
        territories,
        setTerritories,
        selectedTerritory,
        setSelectedTerritory,
        applyToAllTerritories,
        setApplyToAllTerritories,
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
