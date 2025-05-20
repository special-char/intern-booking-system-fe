"use client";

import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface Territory {
  id: string;
  name: string;
}

export function SelectTerritory() {
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(
    null
  );

  useEffect(() => {
    async function fetchTerritories() {
      try {
        const response = await fetch(
          "/api/service-pricing/fetchAllTerritories"
        );
        const data = await response.json();
        setTerritories(data.docs || []);
      } catch (error) {
        console.error("Failed to fetch territories:", error);
      }
    }

    fetchTerritories();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="bg-red">
          {selectedTerritory ? selectedTerritory.name : "All"}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem key="all" onClick={() => setSelectedTerritory(null)}>
          All
        </DropdownMenuItem>
        {territories.map((territory) => (
          <DropdownMenuItem
            key={territory.id}
            onClick={() => setSelectedTerritory(territory)}
          >
            {territory.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
