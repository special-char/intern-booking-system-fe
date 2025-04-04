"use client";

import { Button } from "@/components/shadcn/button";
import { SheetFooter } from "@/components/shadcn/sheet";
import { PreInspectionCheckStatus } from "@/types/orders/pre-inspection";

interface PreInspectionStatusButtonsProps {
  onChange: (status: PreInspectionCheckStatus) => void
}

export function PreInspectionStatusButtons({ onChange }: PreInspectionStatusButtonsProps) {
  return (
    <SheetFooter className="flex flex-row gap-3 p-0 px-4">
      <Button
        variant="destructive"
        type="button"
        className="w-full"
        onClick={() => onChange("notDone")}
      >
        Mark as not done
      </Button>
      <Button
        className="w-full"
        onClick={() => onChange("done")}
      >
        Mark as done
      </Button>
    </SheetFooter>
  )
}