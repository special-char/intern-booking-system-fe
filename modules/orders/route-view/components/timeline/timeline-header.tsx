"use client";

import { ChevronUp, ChevronDown, Eye } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { ToolsIcon } from "@/icons/tools";
import { useRouteView } from "@/contexts/route-view-context";

export function TimelineHeader() {
  const { toggleMapExpanded } = useRouteView();
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Button size="icon" variant="secondary" onClick={toggleMapExpanded}>
          <ChevronUp className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="secondary" onClick={toggleMapExpanded}>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-purple-50 text-purple-600 rounded-lg p-1 flex items-center gap-1">
          <ToolsIcon className="w-4 h-4" />
          <span className="text-xs font-semibold">Tire Installation</span>
        </div>
        <div className="bg-orange-50 text-orange-600 rounded-lg p-1 flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span className="text-xs font-semibold">Tire Inspection</span>
        </div>
      </div>
    </div>
  );
}
