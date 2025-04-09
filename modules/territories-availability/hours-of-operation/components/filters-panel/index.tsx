"use client"

import { MaxHeightWrapper } from "@/components/common/max-height-wrapper";
import { DateFilterRange } from "@/components/common/route-filters/date-filter-range";
import { Filters } from "./filters";
import { DateRange } from "@/types/date";

interface FiltersPanelProps {
  dateRange: DateRange
}

export function FiltersPanel({ dateRange }: FiltersPanelProps) {
  return (
    <MaxHeightWrapper className="overflow-y-scroll" disabledAt="lg">
      <div className="flex flex-wrap items-start lg:items-stretch lg:flex-col gap-4 lg:max-w-62.5">
        <DateFilterRange dateRange={dateRange} />
        <div className="min-w-62.5">
          <Filters />
        </div>
      </div>
    </MaxHeightWrapper>
  );
}