import { Button } from "@/components/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface AppointmentDetailsHeaderDropdownProps {
  onEdit: () => void;
}

export function AppointmentDetailsHeaderDropdown({ onEdit }: AppointmentDetailsHeaderDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute !-right-2 -top-2.5 text-secondary">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={onEdit}>
        <DropdownMenuItem>Edit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
