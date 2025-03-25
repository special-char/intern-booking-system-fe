import { PaginatedDataInterface, PaginationInterface } from "@/types/pagination";
import { TechniciansTable } from ".";
import { getTechniciansDTO } from "@/lib/data/technicians";

export async function TechniciansTableTemplate({ page, limit }: PaginatedDataInterface) {
  const { technicians, count } = await getTechniciansDTO({
    page,
    limit,
  });

  const pagination: PaginationInterface = {
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