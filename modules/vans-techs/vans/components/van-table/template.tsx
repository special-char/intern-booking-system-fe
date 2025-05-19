import { getTireVansDTO } from "@/lib/data/vans";
import { PaginationInterface, PaginatedDataInterface } from "@/types/pagination";
import { VansTable } from ".";

interface VansTableTemplateProps extends PaginatedDataInterface {
  search?: string;
}

export async function VansTableTemplate({
  page,
  limit,
  search,
}: VansTableTemplateProps) {
  const data = await getTireVansDTO({
    page,
    limit,
    search
  });

  const pagination: PaginationInterface = {
    pageIndex: page,
    pageSize: limit,
    totalCount: data.totalDocs,
  };

  return <VansTable data={data.docs} pagination={pagination} />;
}