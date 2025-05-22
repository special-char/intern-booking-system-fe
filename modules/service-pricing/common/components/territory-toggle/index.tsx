import { Tooltip } from "@/components/common/tooltip";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { useTerritory } from "@/contexts/territory-context";
import React from "react";

const TerritoryToggle = () => {
  const { applyToAllTerritories, setApplyToAllTerritories } = useTerritory();

  return (
    <div className="flex items-center gap-2 bg-bg-secondary rounded-lg p-3">
      <Checkbox
        id="territory-toggle"
        checked={applyToAllTerritories}
        onCheckedChange={(checked) =>
          setApplyToAllTerritories(checked as boolean)
        }
      />
      <Label className="text-secondary">Apply to all territories</Label>
      <Tooltip>
        <p>Apply to all territories</p>
      </Tooltip>
    </div>
  );
};

export default TerritoryToggle;
