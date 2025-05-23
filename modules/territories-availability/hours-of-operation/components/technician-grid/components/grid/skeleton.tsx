"use client"

import { getWeekDays } from "@/utils/date";
import { TechnicianGridDateCell } from "../header/date-cell";
import { TechnicianGridTechnicianCell } from "../technician-cell";
import { Fragment } from "react";
import { TechnicianTerritoryCell } from "../territory-cell";
import { TechnicianGridWrapper } from "./wrapper";
import { DateRange } from "@/types/date";

interface TechnicianGridSkeletonProps {
  dateRange: DateRange
}

export function TechnicianGridSkeleton({ dateRange }: TechnicianGridSkeletonProps) {
  const weekDays: string[] = getWeekDays(dateRange.from);

  return (
    <TechnicianGridWrapper className="max-h-[50vh]">
      {weekDays.map((day) => (
        <TechnicianGridDateCell
          key={day}
          date={day}
          territories={[]}
          isLoading
        />
      ))}

      {Array.from({ length: 4 }, (_, i) => ({
        id: i,
        name: "",
        email: "",
        password: "",
        mobilePhone: 0,
        updatedAt: "",
        createdAt: ""
      })).map((technician) => (
        <Fragment key={technician.id}>
          <TechnicianGridTechnicianCell
            isDefaultHover={false}
            isLoading
            onDefaultHover={() => { }}
            technician={technician}
            weeklyTerritories={[]}
          />

          {weekDays.map((day) => (
            <TechnicianTerritoryCell
              key={`${technician.id}-${day}`}
              date={day}
              isDefaultHover={false}
              isLoading
              territories={[]}
              technician={technician}
              dateRange={dateRange}
              territoriesData={[]}
            />
          ))}
        </Fragment>
      )
      )}
    </TechnicianGridWrapper>
  )
}