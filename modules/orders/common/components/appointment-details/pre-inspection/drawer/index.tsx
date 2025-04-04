import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/shadcn/sheet";
import { PreInspectionCheck, PreInspectionCheckStatus, PreInspectionRemark } from "@/types/orders/pre-inspection";
import { AppointmentDetailsSheetContentWrapper } from "../../sheets/common/content-wrapper";
import { PreInspectionRemarksForm } from "./form";
import { useMemo } from "react";
import { PreInspectionStatusButtons } from "./status-buttons";

interface PreInspectionDrawerProps {
  isOpen: boolean
  onClose: () => void
  onChange: (preInspectionCheckData: PreInspectionCheck) => void
  data: PreInspectionCheck
  title: string
}

export function PreInspectionDrawer({ isOpen, onClose, data, title, onChange }: PreInspectionDrawerProps) {
  const titleMemoized: string = useMemo(() => title, [])

  function handleRemarksChange(remarks: PreInspectionRemark[]): void {
    onChange({
      ...data,
      remarks
    })
  }

  function handleStatusChange(status: PreInspectionCheckStatus): void {
    onChange({
      ...data,
      status
    })
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white sm:min-w-125 gap-0">
        <SheetHeader className="border-none bg-purple-50">
          <SheetTitle className="flex justify-center items-center text-sm font-medium text-secondary">
            {titleMemoized}
          </SheetTitle>
        </SheetHeader>

        <AppointmentDetailsSheetContentWrapper className="py-4 px-0 pt-3 grow overflow-y-scroll">
          <PreInspectionRemarksForm
            initialValues={{ remarks: data.remarks ?? [] }}
            onChange={handleRemarksChange}
          />
          <PreInspectionStatusButtons onChange={handleStatusChange} />
        </AppointmentDetailsSheetContentWrapper>
      </SheetContent>
    </Sheet>
  );
}