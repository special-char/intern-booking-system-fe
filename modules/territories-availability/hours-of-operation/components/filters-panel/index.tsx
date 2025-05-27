"use client"

import { MaxHeightWrapper } from "@/components/common/max-height-wrapper";
import { DateFilterRange } from "@/components/common/route-filters/date-filter-range";
import { Filters } from "./filters";
import { DateRange } from "@/types/date";
import { Territory } from "@/payload-types";

interface FiltersPanelProps {
  dateRange: DateRange
  territories: Territory[]
}

export function FiltersPanel({ dateRange, territories }: FiltersPanelProps) {
  return (
    <MaxHeightWrapper className="overflow-y-scroll" disabledAt="lg">
      <div className="flex flex-wrap items-start lg:items-stretch lg:flex-col gap-4 lg:max-w-62.5">
        <DateFilterRange dateRange={dateRange} />
        <div className="min-w-62.5">
          <Filters territories={territories}  />
        </div>
      </div>
    </MaxHeightWrapper>
  );
}