export interface PreInspectionRemark {
  description: string
  photos: string[] | null
  date: string

}

export type PreInspectionCheckStatus = "done" | "notDone" | "pending"

export interface PreInspectionCheck {
  remarks?: PreInspectionRemark[],
  status: PreInspectionCheckStatus
  odometerValue?: number | null
  lastScan?: string
}

export interface PreInspection {
  id: string,
  damage: PreInspectionCheck
  tireSizing: PreInspectionCheck
  wheelLocks: PreInspectionCheck
  odometer: PreInspectionCheck
  treadDepths: PreInspectionCheck
}