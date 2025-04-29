import {
  PaginatedDataInterface,
  PaginationInterface,
} from "@/types/pagination";
import { TechniciansTable } from ".";
import { getTechniciansDTO } from "@/lib/data/technicians";

export async function TechniciansTableTemplate({
  page,
  limit,
}: PaginatedDataInterface) {
  const technicians = await getTechniciansDTO({
    page,
    limit,
  });

  const pagination: PaginationInterface = {
    pageIndex: page,
    pageSize: limit,
    totalCount: technicians.totalDocs,
  };

  return <TechniciansTable data={technicians.docs} pagination={pagination} />;
}
