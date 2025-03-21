import { getTireVansDTO } from "@/lib/data/vans";
import { Pagination } from "@/types/common";
import { VansTable } from ".";

export async function VansTableTemplate() {
  const data = await getTireVansDTO({ page: 1, limit: 10 });

  const pagination: Pagination = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: data.length,
  };

  return (<VansTable data={data} pagination={pagination} />);
}