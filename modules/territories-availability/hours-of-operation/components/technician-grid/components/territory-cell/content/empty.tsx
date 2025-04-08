import { Plus } from "lucide-react";
import { Button } from "@/components/shadcn/button";

interface TechnicianTerritoryEmptyCellContentProps {
  isLoading?: boolean
  onButtonFocus: (isFocused: boolean) => void
  onClick: () => void
}

export function TechnicianTerritoryEmptyCellContent({ isLoading = false, onButtonFocus, onClick }: TechnicianTerritoryEmptyCellContentProps) {
  return (
    <Button
      variant="ghost"
      className="flex flex-col items-center justify-center gap-2 min-h-fit max-w-full transition-all duration-300"
      onFocus={() => onButtonFocus(true)}
      onBlur={() => onButtonFocus(false)}
      onClick={onClick}
      disabled={isLoading}
    >
      <Plus className="min-h-6 min-w-6" />
      <span className="text-[0.8125rem]">Add <br />Hours of Operation</span>
    </Button>
  );
}
