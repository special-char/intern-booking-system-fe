"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface RouteViewContextType {
  isMapExpanded: boolean;
  toggleMapExpanded: () => void;
}

const RouteViewContext = createContext<RouteViewContextType | undefined>(
  undefined
);

export const useRouteView = () => {
  const context = useContext(RouteViewContext);
  if (!context) {
    throw new Error("useRouteView must be used within a RouteViewProvider");
  }
  return context;
};

export const RouteViewProvider = ({ children }: { children: ReactNode }) => {
  const [isMapExpanded, setIsMapExpanded] = useState(true);

  const toggleMapExpanded = () => setIsMapExpanded((prev) => !prev);

  return (
    <RouteViewContext.Provider value={{ isMapExpanded, toggleMapExpanded }}>
      {children}
    </RouteViewContext.Provider>
  );
};
