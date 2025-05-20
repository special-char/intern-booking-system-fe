import { getOrderListDTO } from "@/lib/data/order";
import { PaginatedDataInterface, PaginationInterface } from "@/types/pagination";
import { OrdersTable } from ".";

interface OrdersTableTemplateProps extends PaginatedDataInterface {
  search?: string;
  dateFilter?: Date | null;
}

export async function OrdersTableTemplate({ 
  page, 
  limit, 
  search,
  dateFilter 
}: OrdersTableTemplateProps) {
  const result = await getOrderListDTO({
    page,
    limit,
    search,
    dateFilter
  });

  const pagination: PaginationInterface = {
    pageIndex: page,
    pageSize: limit,
    totalCount: result.count as number,
  };

  return (
    <OrdersTable
      data={result.orders}
      pagination={pagination}
    />
  );
}