import React from "react";
import { Button } from "@/components/shadcn/button";
import { SheetFooter } from "@/components/shadcn/sheet";
import { Spinner } from "@/components/common/spinner";

interface ActionButtonsProps {
  onUndo: () => void;
  onSaveAsDefault: () => void;
  onSaveWeek: () => void;
  isSaving: boolean;
  isUndoDisabled?: boolean;
  isSaveAsDefaultDisabled?: boolean;
}

export function ActionButtons({
  onUndo,
  onSaveAsDefault,
  onSaveWeek,
  isSaving,
  isUndoDisabled = false,
  isSaveAsDefaultDisabled = false,
}: ActionButtonsProps) {
  return (
    <SheetFooter className="bg-background py-6">
      <div className="flex justify-between px-6 w-full">
        <Button
          variant="outline"
          onClick={onUndo}
          className="text-sm font-medium"
          disabled={isUndoDisabled}
        >
          Undo all changes
        </Button>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onSaveAsDefault}
            className="text-sm font-medium"
            disabled={isSaveAsDefaultDisabled || isSaving}
          >
            Save as default week
          </Button>
          <Button
            variant="default"
            onClick={onSaveWeek}
            className="text-sm font-medium"
            disabled={isSaving}
          >
            {isSaving ? <Spinner /> : "Save for this week only"}
          </Button>
        </div>
      </div>
    </SheetFooter>
  );
}
