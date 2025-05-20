import { PaginatedDataInterface } from "@/types/pagination";
import { OrdersTableTemplate } from "../components/orders-table/template";
import { Suspense } from "react";
import { OrdersTable, OrdersTableProps } from "../components/orders-table";

interface OrdersListViewTemplateProps extends PaginatedDataInterface {
  search?: string;
  dateFilter?: Date | null;
}

export async function OrdersListViewTemplate({ page, limit, search, dateFilter }: OrdersListViewTemplateProps) {
  return (
    <Suspense fallback={<OrdersTable data={[]} pagination={{ pageIndex: 1, pageSize: limit, totalCount: 0 }} isLoading />}>
      <OrdersTableTemplate page={page} limit={limit} search={search} dateFilter={dateFilter} />
    </Suspense>
  );
}
