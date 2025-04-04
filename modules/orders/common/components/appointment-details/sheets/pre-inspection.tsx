import {
  SheetHeader,
  SheetTitle,
} from "@/components/shadcn/sheet"
import { Event } from "@/types/orders/event"
import { PreInspectionHeader } from "../pre-inspection/header"
import { PreInspectionContent } from "../pre-inspection/content"
import { PreInspectionDrawer } from "../pre-inspection/drawer"
import { useEffect, useState } from "react"
import { PreInspection, PreInspectionCheck } from "@/types/orders/pre-inspection"
import { BackButton } from "./common/back-button"
import { getPreInspectionTitle } from "@/modules/orders/calendar-view/utils"

export interface PreInspectionData {
  data: Event
  onEventChange: (event: Event) => void
}

export function PreInspectionSheet({ data, onEventChange }: PreInspectionData) {
  const [selectedCheckType, setSelectedCheckType] = useState<string>("")
  const [preInspectionCheckData, setPreinspectionCheckData] = useState<PreInspectionCheck | null>(null)

  useEffect(() => {
    if (!selectedCheckType) {
      return
    }

    const preInspectionCheckData = data.preInspection[selectedCheckType as keyof PreInspection]
    if (typeof preInspectionCheckData === "string") {
      return
    }

    setPreinspectionCheckData(preInspectionCheckData)
  }, [selectedCheckType, data])

  function handleCheckTypeChange(checkType: string): void {
    setSelectedCheckType(checkType)
  }

  function handleCloseDrawer(): void {
    setSelectedCheckType("")
    setTimeout(() => {
      setPreinspectionCheckData(null)
    }, 300);
  }

  function handlePreInspectionCheckDataChange(preInspectionCheckData: PreInspectionCheck, checkType?: keyof PreInspection): void {
    const checkTypeToUpdate: keyof PreInspection = checkType ?? selectedCheckType as keyof PreInspection
    const newEvent: Event = {
      ...data,
      preInspection: {
        ...data.preInspection,
        [checkTypeToUpdate]: {
          ...data.preInspection[checkTypeToUpdate as keyof PreInspection] as PreInspectionCheck,
          ...preInspectionCheckData
        }
      }
    }
    onEventChange(newEvent)
  }

  return (
    <>
      <div className="bg-purple-50">
        <SheetHeader className="ml-4 border-none">
          <div className="flex justify-center items-center relative">
            <SheetTitle className="text-sm font-medium">
              VEHICLE DETAILS
            </SheetTitle>
            <BackButton goToScreen={1} />
          </div>
          <PreInspectionHeader data={data} />
        </SheetHeader>

        <PreInspectionContent
          data={data.preInspection}
          onClick={handleCheckTypeChange}
          onPreInspectionCheckDataChange={handlePreInspectionCheckDataChange}
        />
      </div>

      {preInspectionCheckData && (
        <PreInspectionDrawer
          isOpen={!!selectedCheckType}
          onClose={handleCloseDrawer}
          data={preInspectionCheckData}
          onChange={handlePreInspectionCheckDataChange}
          title={getPreInspectionTitle(selectedCheckType)}
        />
      )}
    </>
  )
}
