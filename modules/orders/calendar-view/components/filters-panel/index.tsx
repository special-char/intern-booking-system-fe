"use client"

import { MaxHeightWrapper } from "@/components/common/max-height-wrapper";
import { DateFilter } from "@/components/common/route-filters/date-filter";
import { Filters } from "./filters";

interface FiltersPanelProps {
  date: string
}

export function FiltersPanel({ date }: FiltersPanelProps) {
  return (
    <MaxHeightWrapper className="overflow-y-scroll" disabledAt="lg">
      <div className="flex flex-wrap items-start lg:items-stretch lg:flex-col gap-4 lg:max-w-62.5">
        <DateFilter date={date} />
        <div className="min-w-62.5">
          <Filters />
        </div>
      </div>
    </MaxHeightWrapper>
  );
}