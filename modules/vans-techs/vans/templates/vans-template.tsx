import SearchInput from "@/components/common/search-input";
import { UserIcon } from "lucide-react";
import { columns } from "../components/van-table/columns";
import { VansTable } from "../components/van-table";
import { AddVan } from "../components/add-van";
import { Pagination } from "@/types/common";
import { getTireVansDTO } from "@/lib/data/vans";

export async function VansTemplate() {
  const data = await getTireVansDTO({ page: 1, limit: 10 });

  const pagination: Pagination = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: data.length,
  };

  return (
    <div className="py-8 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <UserIcon size={24} />
          <p className="text-lg font-bold">Movile tire vans</p>
        </div>
        <div className="flex gap-5">
          <SearchInput className="min-w-[320px]" />
          <AddVan />
        </div>
      </div>
      <VansTable columns={columns} data={data} pagination={pagination} />
    </div>
  );
}
