import { OrdersListViewTemplate } from "@/modules/orders/list-view/templates/orders-list-view-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Orders",
  description: "Treadcommand | Orders",
};

export default async function ListViewPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // Convert searchParams to numbers safely
  const page = params.page ? Number(params.page) : 1;
  const limit = params.limit ? Number(params.limit) : 15;
  const search = params.search as string | undefined;
  const dateFilter = params.dateFilter
    ? new Date(params.dateFilter as string)
    : null;

  return (
    <OrdersListViewTemplate
      page={page}
      limit={limit}
      search={search}
      dateFilter={dateFilter}
    />
  );
}
