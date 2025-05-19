import { OrdersListViewTemplate } from "@/modules/orders/list-view/templates/orders-list-view-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Orders",
  description: "Treadcommand | Orders",
};

export default async function ListViewPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Convert searchParams to numbers safely
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const limit = searchParams.limit ? Number(searchParams.limit) : 15;
  const search = searchParams.search as string | undefined;
  const dateFilter = searchParams.dateFilter ? new Date(searchParams.dateFilter as string) : null;

  return (
    <OrdersListViewTemplate
      page={page}
      limit={limit}
      search={search}
      dateFilter={dateFilter}
    />
  );
}