"use client";

import { MaxHeightWrapper } from "@/components/common/max-height-wrapper";
import {
  TechnicianHoursOfOperation,
  TechnicianHoursOfOperationTerritory,
} from "@/types/territories/technician-hours-of-operation";
import { getWeekDays } from "@/utils/date";
import moment, { Moment } from "moment";

import { Fragment, useState } from "react";
import { TechnicianGridDateCell } from "../header/date-cell";
import { TechnicianGridTechnicianCell } from "../technician-cell";
import { TechnicianTerritoryCell } from "../territory-cell";
import { TechnicianGridWrapper } from "./wrapper";
import { DateRange } from "@/types/date";
import { Technician, Territory } from "@/payload-types";

interface TechnicianGridProps {
  dateRange: DateRange;
  technicianHoursOfOperation: TechnicianHoursOfOperation;
  territories: Territory[];
}

export function TechnicianGrid({
  dateRange,
  technicianHoursOfOperation,
  territories,
}: TechnicianGridProps) {
  const [hoveredTechnicianId, setHoveredTechnicianId] = useState<number>(0);
  const weekDays: string[] = getWeekDays(dateRange.from);

  function getDateUniqueTerritories(
    date: string
  ): TechnicianHoursOfOperationTerritory[] {
    const targetDate: Moment = moment(date, "YYYY-MM-DD");
    const uniqueTerritories: TechnicianHoursOfOperationTerritory[] = [];
    const seenIds: Set<string> = new Set<string>();

    for (const { territories } of technicianHoursOfOperation.data) {
      for (const territory of territories) {
        const territoryDate: Moment = moment(territory.from, "YYYY-MM-DD");
        if (
          territoryDate.isSame(targetDate, "day") &&
          !seenIds.has(territory.id)
        ) {
          seenIds.add(territory.id);
          uniqueTerritories.push(territory);
        }
      }
    }

    return getTerritoriesSortedByName(uniqueTerritories);
  }

  function getTechnicianUniqueWeekTerritories(
    technicianId: number
  ): TechnicianHoursOfOperationTerritory[] {
    const technicianAllWeekTerritories: TechnicianHoursOfOperationTerritory[] =
      getTechnicianAllWeekTerritories(technicianId);
    const uniqueTerritories: TechnicianHoursOfOperationTerritory[] = [];
    const seenIds: Set<string> = new Set<string>();

    for (const territory of technicianAllWeekTerritories) {
      if (!seenIds.has(territory.id)) {
        seenIds.add(territory.id);
        uniqueTerritories.push(territory);
      }
    }

    return getTerritoriesSortedByName(uniqueTerritories);
  }

  function getTechnicianAllWeekTerritories(
    technicianId: number
  ): TechnicianHoursOfOperationTerritory[] {
    const technicianTerritories:
      | TechnicianHoursOfOperationTerritory[]
      | undefined =
      technicianHoursOfOperation.data.find(
        ({ technician }) => technician.id === technicianId
      )?.territories ?? [];
    return technicianTerritories;
  }

  function handleTechnicianHover(technicianId: number): void {
    setHoveredTechnicianId(technicianId);
  }

  function getTerritoriesSortedByName(
    territories: TechnicianHoursOfOperationTerritory[]
  ): TechnicianHoursOfOperationTerritory[] {
    return territories.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  return (
    <MaxHeightWrapper className="overflow-y-scroll">
      <TechnicianGridWrapper>
        {weekDays.map((day) => (
          <TechnicianGridDateCell
            key={day}
            date={day}
            territories={getDateUniqueTerritories(day)}
          />
        ))}

        {technicianHoursOfOperation.data.map(({ technician }) => {
          const technicianUniqueWeekTerritories: TechnicianHoursOfOperationTerritory[] =
            getTechnicianUniqueWeekTerritories(technician.id ?? 0);
          const technicianAllWeekTerritories: TechnicianHoursOfOperationTerritory[] =
            getTechnicianAllWeekTerritories(technician.id ?? 0);

          return (
            <Fragment key={technician.id}>
              <TechnicianGridTechnicianCell
                isDefaultHover={hoveredTechnicianId === technician.id}
                onDefaultHover={handleTechnicianHover}
                technician={technician}
                weeklyTerritories={technicianUniqueWeekTerritories}
              />

              {weekDays.map((day) => (
                <TechnicianTerritoryCell
                  key={`${technician.id}-${day}`}
                  date={day}
                  isDefaultHover={hoveredTechnicianId === technician.id}
                  technicianAllWeekTerritories={technicianAllWeekTerritories}
                  technician={technician as Technician}
                  dateRange={dateRange}
                  territories={territories}
                />
              ))}
            </Fragment>
          );
        })}
      </TechnicianGridWrapper>
    </MaxHeightWrapper>
  );
}
