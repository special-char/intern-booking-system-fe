import { getTireVansDTO } from "@/lib/data/vans";
import { PaginationInterface } from "@/types/pagination";
import { VansTable } from ".";

export async function VansTableTemplate() {
  const data = await getTireVansDTO({ page: 1, limit: 10 });

  const pagination: PaginationInterface = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: data.length,
  };

  return (<VansTable data={data} pagination={pagination} />);
}