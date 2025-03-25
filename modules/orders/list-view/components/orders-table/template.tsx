import { getOrderListDTO } from "@/lib/data/order";
import { PaginatedDataInterface, PaginationInterface } from "@/types/pagination";
import { OrdersTable } from ".";

export async function OrdersTableTemplate({ page, limit }: PaginatedDataInterface) {
  const { orders, count } = await getOrderListDTO({ page, limit }) ?? {};

  const pagination: PaginationInterface = {
    pageIndex: page,
    pageSize: limit,
    totalCount: count ?? 0,
  }
  return (<OrdersTable data={orders ?? []} pagination={pagination} />);
}
