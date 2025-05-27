import SearchInput from "@/components/common/search-input";
import { TechnicianGridTemplate } from "../components/technician-grid/template";
import { Suspense } from "react";
import { Header } from "../components/header";
import { TechnicianGridSkeleton } from "../components/technician-grid/components/grid/skeleton";
import { FiltersPanel } from "../components/filters-panel";
import { DateRange } from "@/types/date";
import { getTerritories } from "@/lib/data/territories";


interface HoursOfOperationTemplateProps {
  dateRange: DateRange;
  filters: Record<string, boolean>;
  search: string;
}

export async function HoursOfOperationTemplate({
  dateRange,
  filters,
  search,
}: HoursOfOperationTemplateProps) {
  const territories = await getTerritories();
  return (
    <div className="flex flex-col lg:flex-row gap-5 px-6 py-8">
      <div className="order-1 lg:order-none min-w-62.5">
        <FiltersPanel dateRange={dateRange} territories={territories} />
      </div>
      <div className="flex flex-col grow order-none lg:order-1 overflow-x-hidden gap-5">
        <div className="flex flex-row items-center w-full gap-4">
          <Header dateRange={dateRange} />
          <SearchInput className="ml-auto p-2" defaultValue={search} />
        </div>
        <div className="border shadow-card rounded-lg overflow-y-scroll">
          <Suspense
            key={`${JSON.stringify(dateRange)}-${JSON.stringify(filters)}`}
            fallback={<TechnicianGridSkeleton dateRange={dateRange} />}
          >
            <TechnicianGridTemplate
              dateRange={dateRange}
              territories={territories}
              filters={filters}
              search={search}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
