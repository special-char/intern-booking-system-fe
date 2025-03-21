import { PaginatedData, Pagination } from "@/types/common";
import { TechniciansTable } from ".";
import { getTechniciansDTO } from "@/lib/data/technicians";

export async function TechniciansTableTemplate({ page, limit }: PaginatedData) {
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
    <TechniciansTable
      data={technicians}
      pagination={pagination}
    />
  );
}