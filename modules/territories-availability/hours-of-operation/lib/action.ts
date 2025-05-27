"use server";

import {
  storeTechnicianHoursOfOperation,
  TerritorySchedule,
} from "@/lib/data/configuration";

export async function saveHoursOfOperation(
  hoursOfOperation: TerritorySchedule[]
) {
  const res = await storeTechnicianHoursOfOperation(hoursOfOperation);
  return res;
}
