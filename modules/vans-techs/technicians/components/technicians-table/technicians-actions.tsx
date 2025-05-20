import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { TechnicianForm, TechnicianFormType } from "../technician-form";
import { Sheet } from "@/components/shadcn/sheet";
import { deleteTechnician } from "@/lib/data/technicians";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useToast } from "@/hooks/use-toast";

interface TechniciansActionsProps {
  disabled?: boolean;
  initialValues: TechnicianFormType & { id: string };
}

export function TechniciansActions({
  disabled,
  initialValues,
}: TechniciansActionsProps) {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { toast } = useToast();
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteTechnician(initialValues.id);
      if (response.isSuccess) {
        toast({
          title: "Technician deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting technician:", error);
    }
    setIsDeleting(false);
    setIsAlertOpen(false);
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
          <DropdownMenuItem
            onClick={() => setIsAlertOpen(true)}
            disabled={isDeleting}
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <TechnicianForm
          setIsOpen={setSheetOpen}
          isEdit
          initialValues={initialValues}
        />
      </Sheet>
      <ConfirmDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title="Are you sure?"
        description="Do you really want to delete this technician? This action cannot be undone."
        onConfirm={handleDelete}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isLoading={isDeleting}
      />
    </>
  );
}
