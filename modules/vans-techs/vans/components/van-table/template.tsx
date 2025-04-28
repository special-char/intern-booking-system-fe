import { getTireVansDTO } from "@/lib/data/vans";
import { PaginationInterface } from "@/types/pagination";
import { VansTable } from ".";

export async function VansTableTemplate() {
  const data = await getTireVansDTO();

  const pagination: PaginationInterface = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: data.totalDocs,
  };

  return (<VansTable data={data.docs} pagination={pagination} />);
}