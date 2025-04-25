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
  const page = params.page ? parseInt(params.page as string) : 1;
  const limit = params.limit ? parseInt(params.limit as string) : 20;

  return (
    <OrdersListViewTemplate page={page} limit={limit} />
  );
}
