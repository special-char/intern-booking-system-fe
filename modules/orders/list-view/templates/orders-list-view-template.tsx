import { PaginatedDataInterface } from "@/types/pagination";
import { OrdersTableTemplate } from "../components/orders-table/template";
import { Suspense } from "react";
import { getTableLoadingData } from "@/utils/get-table-loading-data";
import { OrdersTable, OrdersTableProps } from "../components/orders-table";

export async function OrdersListViewTemplate(props: PaginatedDataInterface) {
  const { data, pagination } = getTableLoadingData()

  return (
    <Suspense fallback={<OrdersTable data={data as OrdersTableProps['data']} pagination={pagination} isLoading />}>
      <OrdersTableTemplate {...props} />
    </Suspense>
  );
}
