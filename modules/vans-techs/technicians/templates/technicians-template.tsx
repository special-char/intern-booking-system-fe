import SearchInput from "@/components/common/search-input";
import { UserIcon } from "lucide-react";

import { PaginatedDataInterface } from "@/types/pagination";
import { TechnicianFormModal } from "../components/technician-form-modal";
import { getTableLoadingData } from "@/utils/get-table-loading-data";
import { TechniciansTable } from "../components/technicians-table";
import { Suspense } from "react";
import { TechniciansTableTemplate } from "../components/technicians-table/template";

interface TechniciansTemplateProps extends PaginatedDataInterface {
  search?: string;
}

export async function TechniciansTemplate(props: TechniciansTemplateProps) {
  const { data, pagination } = getTableLoadingData();
  const { search } = props;

  return (
    <div className="py-8 px-6">
      <div className="flex justify-between md:items-center flex-col md:flex-row gap-4 md:gap-0">
        <div className="flex items-center gap-2">
          <UserIcon size={24} />
          <p className="text-lg font-bold">Technicians</p>
        </div>
        <div className="flex gap-5 flex-col md:flex-row">
          <SearchInput
            className="md:min-w-[320px]"
            defaultValue={search}
          />
          <TechnicianFormModal />
        </div>
      </div>
      <Suspense fallback={<TechniciansTable data={data as unknown as TechniciansTable['data']} pagination={pagination} isLoading />}>
        <TechniciansTableTemplate {...props} />
      </Suspense>
    </div>
  );
}
