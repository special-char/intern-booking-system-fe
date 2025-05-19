import {
  PaginatedDataInterface,
  PaginationInterface,
} from "@/types/pagination";
import { TechniciansTable } from ".";
import { getTechnicians } from "@/lib/data/technicians";

export async function TechniciansTableTemplate({
  page,
  limit,
}: PaginatedDataInterface) {
  const technicians = await getTechnicians({
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
