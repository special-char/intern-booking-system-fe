import { PaginationInterface } from "@/types/pagination";

interface GetTableLoadingDataReturnInterface {
  data: { id: string }[];
  pagination: PaginationInterface;
}

export function getTableLoadingData(length: number = 10): GetTableLoadingDataReturnInterface {
  const data: { id: string }[] = Array.from({ length }, (_, i) => ({
    id: i.toString(),
  }))

  const pagination: PaginationInterface = {
    pageIndex: 1,
    pageSize: 20,
    totalCount: length,
  };

  return { data, pagination }
}