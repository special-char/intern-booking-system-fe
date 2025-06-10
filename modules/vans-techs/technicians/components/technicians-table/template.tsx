import {
  PaginatedDataInterface,
  PaginationInterface,
} from "@/types/pagination";
import { ManagersTable } from ".";
import { getManagers } from "@/lib/data/technicians";

interface ManagersTableTemplateProps extends PaginatedDataInterface {
  search?: string;
}

export async function ManagersTableTemplate({
  page,
  limit,
  search,
}: ManagersTableTemplateProps) {
  const managers = await getManagers({
    page,
    limit,
    where: search
  });

  const pagination: PaginationInterface = {
    pageIndex: page,
    pageSize: limit,
    totalCount: managers.totalDocs,
  };

  return <ManagersTable data={managers.docs} pagination={pagination} />;
}
