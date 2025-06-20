import SearchInput from "@/components/common/search-input";
import { UserIcon } from "lucide-react";

import { PaginatedDataInterface } from "@/types/pagination";
import { ManagerFormModal } from "../components/technician-form-modal";
import { getTableLoadingData } from "@/utils/get-table-loading-data";
import { ManagersTable } from "../components/technicians-table";
import { Suspense } from "react";
import { ManagersTableTemplate } from "../components/technicians-table/template";

interface ManagersTemplateProps extends PaginatedDataInterface {
  search?: string;
}

export async function ManagersTemplate(props: ManagersTemplateProps) {
  const { data, pagination } = getTableLoadingData();
  const { search } = props;

  return (
    <div className="py-4 px-2 sm:py-8 sm:px-6 w-full max-w-full">
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between sm:items-center w-full">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <UserIcon size={24} />
          <p className="text-lg font-bold">Managers</p>
        </div>
        <div className="flex flex-col gap-3 w-full sm:w-auto sm:flex-row sm:gap-5">
          <SearchInput
            className="w-full sm:w-[320px]"
            defaultValue={search}
          />
          <ManagerFormModal />
        </div>
      </div>
      <div className="mt-4 sm:mt-8 w-full overflow-x-auto">
        <Suspense fallback={<ManagersTable data={data as unknown as ManagersTable['data']} pagination={pagination} isLoading />}> 
          <ManagersTableTemplate {...props} />
        </Suspense>
      </div>
    </div>
  );
}
