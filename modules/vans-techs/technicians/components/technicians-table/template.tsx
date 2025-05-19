import {
  PaginatedDataInterface,
  PaginationInterface,
} from "@/types/pagination";
import { TechniciansTable } from ".";
import { getTechnicians } from "@/lib/data/technicians";

interface TechniciansTableTemplateProps extends PaginatedDataInterface {
  search?: string;
}

export async function TechniciansTableTemplate({
  page,
  limit,
  search,
}: TechniciansTableTemplateProps) {
  const technicians = await getTechnicians({
    page,
    limit,
    where: search
  });

  const pagination: PaginationInterface = {
    pageIndex: page,
    pageSize: limit,
    totalCount: technicians.totalDocs,
  };

  return <TechniciansTable data={technicians.docs} pagination={pagination} />;
}
