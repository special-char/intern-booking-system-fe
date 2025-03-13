import { getOrderListDTO } from "@/lib/data/order";
import { OrdersTable } from "../components/orders-table";
import { columns } from "../components/orders-table/columns";

export const OrdersListViewTemplate = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const data = await getOrderListDTO({ page, limit });

  if (!data) {
    return <div>No orders found</div>;
  }

  return (
    <OrdersTable
      columns={columns}
      data={data?.orders}
      pagination={{
        pageIndex: page,
        pageSize: limit,
        totalCount: data.count,
      }}
    />
  );
};
