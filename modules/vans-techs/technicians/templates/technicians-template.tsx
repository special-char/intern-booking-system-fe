import SearchInput from "@/components/common/search-input";
import { UserIcon } from "lucide-react";
import { TechniciansTable } from "../components/technicians-table";
import { columns } from "../components/technicians-table/columns";

import { Pagination } from "@/types/common";
import { getTechniciansDTO } from "@/lib/data/technicians";
import { TechnicianFormModal } from "../components/technician-form-modal";

export async function TechniciansTemplate({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const { technicians, count } = await getTechniciansDTO({
    page,
    limit,
  });

  const pagination: Pagination = {
    pageIndex: page,
    pageSize: limit,
    totalCount: count,
  };

  return (
    <div className="py-8 px-6">
      <div className="flex justify-between md:items-center flex-col md:flex-row gap-4 md:gap-0">
        <div className="flex items-center gap-2">
          <UserIcon size={24} />
          <p className="text-lg font-bold">Technicians</p>
        </div>
        <div className="flex gap-5 flex-col md:flex-row">
          <SearchInput className="md:min-w-[320px]" />
          <TechnicianFormModal />
        </div>
      </div>
      <TechniciansTable
        columns={columns}
        data={technicians}
        pagination={pagination}
      />
    </div>
  );
}
