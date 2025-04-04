import { Button } from "@/components/shadcn/button";
import { PlusIcon } from "lucide-react";

interface AddRemarkButtonProps {
  onClick: () => void;
}

export function AddRemarkButton({ onClick }: AddRemarkButtonProps) {
  return (
    <div className="border-b pb-4 px-4 pl-2">
      <Button
        variant="ghost"
        className="flex gap-3 px-2"
        onClick={onClick}
      >
        <PlusIcon />
        <span className="text-sm text-secondary">Add new remark</span>
      </Button>
    </div>
  );
}
