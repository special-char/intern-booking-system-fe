import SearchInput from "@/components/common/search-input";
import { UserIcon } from "lucide-react";
import { AddVan } from "../components/add-van";
import { getTableLoadingData } from "@/utils/get-table-loading-data";
import { VansTable, VansTableProps } from "../components/van-table";
import { Suspense } from "react";
import { VansTableTemplate } from "../components/van-table/template";
import { PaginatedDataInterface } from "@/types/pagination";

interface VansTemplateProps extends PaginatedDataInterface {
  search?: string;
}

export async function VansTemplate(props: VansTemplateProps) {
  const { data, pagination } = getTableLoadingData();
  const { search } = props;

  return (
    <div className="py-8 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <UserIcon size={24} />
          <p className="text-lg font-bold">Movile tire vans</p>
        </div>
        <div className="flex gap-5">
          <SearchInput className="min-w-[320px]" defaultValue={search} />
          <AddVan />
        </div>
      </div>
      <Suspense fallback={<VansTable data={data as VansTableProps['data']} pagination={pagination} isLoading />}>
        <VansTableTemplate {...props} />
      </Suspense>
    </div>
  );
}
