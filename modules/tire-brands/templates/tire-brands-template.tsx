import SearchInput from "@/components/common/search-input";
import { UserIcon } from "lucide-react";
import { TireBrandTableTemplate } from "../components/brands-table/template";
import { Suspense } from "react";
import { getTableLoadingData } from "@/utils/get-table-loading-data";
import { TireBrandTable, TireBrandTableProps } from "../components/brands-table";

export function TireBrandsTemplate() {
  const { data, pagination } = getTableLoadingData()

  return (
    <div className="py-8 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <UserIcon size={24} />
          <p className="text-lg font-bold">Choose tire brands to sell</p>
        </div>
        <SearchInput className="min-w-[320px]" />
      </div>
      <Suspense fallback={<TireBrandTable data={data as TireBrandTableProps['data']} pagination={pagination} isLoading />}>
        <TireBrandTableTemplate />
      </Suspense>
    </div>
  );
}