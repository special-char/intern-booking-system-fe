import { useState } from "react";
import { Button } from "@/components/shadcn/button";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Sheet } from "@/components/shadcn/sheet";
import { AddVanForm } from "../add-van-form";
import { TireVanDTO } from "@/types/tire-vans";
import { deleteTireVan } from "@/lib/data/vans";
import { useToast } from "@/hooks/use-toast";

interface VanActionsProps {
  disabled?: boolean
  van: TireVanDTO & { id: string };
}

export default function VanActions({ van, disabled }: VanActionsProps) {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteTireVan(van.id);
      if (response.isSuccess) {
        toast({
          title: "Van deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting tire van:", error);
    }
    setIsDeleting(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={disabled}
            variant="ghost"
            className="p-0 h-fit flex items-center justify-center"
            size="sm"
          >
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setSheetOpen(true);
            }}
          >
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={isDeleting}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <AddVanForm van={van} setIsOpen={setSheetOpen} isEdit />
      </Sheet>
    </>
  );
}
