import { TerritorySchedule } from "@/lib/data/configuration";
import { territoryColors } from "@/utils/get-random-color";
import { OpenHours } from "../components/hours-of-operation-panel/types";
import { Technician, Territory } from "@/payload-types";
import { DateRange } from "@/types/date";
import moment from "moment";
import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";

export const getBlockId = (days: number, start: number, end: number) =>
  `${days}-${start}-${end}-${Math.random().toString(36).slice(2, 7)}`;

export const formatTime = (hour: number): string => {
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}${ampm}`;
};

export const getTerritoryColor = (territoryName: string) => {
  const color = territoryColors[territoryName?.toLowerCase() ?? ""];
  const rgbValues = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  const r = rgbValues?.[1] || "0";
  const g = rgbValues?.[2] || "0";
  const b = rgbValues?.[3] || "0";
  return {
    color,
    bgColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
  };
};

export const calculateTimeFromPosition = (
  pixelY: number,
  startY: number,
  cellHeight: number
) => Math.round((pixelY - startY) / cellHeight);

export function transformOpenHoursToTerritorySchedule(
  openHours: OpenHours[],
  technician: Technician,
  territoriesData: Territory[],
  dateRange: DateRange
) {
  const schedules = openHours.reduce(
    (schedules, { territory, days, start, end }) => {
      const existingSchedule = schedules.find((s) => s.territory === territory);

      if (existingSchedule) {
        existingSchedule.timeSlots?.push({
          days,
          start,
          end,
        });
      } else {
        schedules.push({
          technician,
          territory,
          territoryId:
            territoriesData.find((t) => t.name === territory)?.id ?? 0,
          timeSlots: [{ days, start, end }],
          isDefault: false,
          weekStartDate: dateRange.from,
          weekEndDate: dateRange.to,
        });
      }
      return schedules;
    },
    [] as TerritorySchedule[]
  );

  const nonUsedTerritories = territoriesData.filter((territory) => {
    return !schedules.some((schedule) => schedule.territory === territory.name);
  });

  const territoriesWithoutSchedule = nonUsedTerritories.map((territory) => ({
    technician: technician,
    territory: territory.name ?? "",
    territoryId: territory.id,
    timeSlots: [],
    isDefault: false,
    weekStartDate: null,
    weekEndDate: null,
  }));

  return [...schedules, ...territoriesWithoutSchedule];
}

export const getDayIndex = (dayIndex: number): number => {
  return dayIndex === 6 ? 0 : dayIndex + 1;
};

export function parseTerritoryDateTime(from: string, to: string) {
  const fromParts = from.split("T");
  const toParts = to.split("T");

  const [year, month, day] = fromParts[0].split("-").map(Number);
  const fromDate = new Date(year, month - 1, day);
  const dayOfWeek = fromDate.getDay();

  const startHour = parseInt(fromParts[1].split(":")[0]);
  const endHour = parseInt(toParts[1].split(":")[0]);

  return {
    dayOfWeek,
    startHour,
    endHour,
  };
}

export function filterTerritoriesByDate(
  technicianAllWeekTerritories: TechnicianHoursOfOperationTerritory[],
  date: string
): TechnicianHoursOfOperationTerritory[] {
  return technicianAllWeekTerritories?.filter((territory) => {
    return moment(territory.from, "YYYY-MM-DD").isSame(
      moment(date, "YYYY-MM-DD"),
      "day"
    );
  });
}
