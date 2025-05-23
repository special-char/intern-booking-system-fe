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
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { useEffect } from "react";

export function SelectTerritory({ territories }: { territories: Territory[] }) {
  const { selectedTerritory, setSelectedTerritory, setTerritories } =
    useTerritory();
  const { toast } = useToast();

  const handleTerritorySelect = (territory: Territory) => {
    setSelectedTerritory(territory);
  };

  useEffect(() => {
    setTerritories(territories);
  }, [territories, setTerritories]);

  const handleDropdownClick = () => {
    if (!selectedTerritory) {
      toast({
        title: "Territory Selection Required",
        description: "Please select a territory to continue",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="bg-red"
          onClick={handleDropdownClick}
        >
          {selectedTerritory ? selectedTerritory.name : "All"}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {territories.map((territory) => (
          <DropdownMenuItem
            key={territory.id}
            onClick={() => handleTerritorySelect(territory)}
          >
            <Checkbox
              id={territory.id.toString()}
              checked={selectedTerritory?.id === territory.id}
              onCheckedChange={() => handleTerritorySelect(territory)}
            />
            <Label className="text-secondary" htmlFor={territory.id.toString()}>
              {territory.name}
            </Label>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
