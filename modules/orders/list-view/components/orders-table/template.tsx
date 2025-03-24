import { getOrderListDTO } from "@/lib/data/order";
import { PaginatedData, Pagination } from "@/types/common";
import { OrdersTable } from ".";

export async function OrdersTableTemplate({ page, limit }: PaginatedData) {
  const { orders, count } = await getOrderListDTO({ page, limit }) ?? {};

  const pagination: Pagination = {
    pageIndex: page,
    pageSize: limit,
    totalCount: count ?? 0,
  }
  return (<OrdersTable data={orders ?? []} pagination={pagination} />);
}
