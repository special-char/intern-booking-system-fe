"use client";

import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useTerritory } from "@/contexts/territory-context";
import { Territory } from "@/payload-types";

export function SelectTerritory({ territories }: { territories: Territory[] }) {
  const { selectedTerritory, setSelectedTerritory } = useTerritory();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="bg-red">
          {selectedTerritory ? selectedTerritory.name : "All"}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
