import { Pagination } from "@/types/common";

interface GetTableLoadingDataReturnInterface {
  data: { id: string }[];
  pagination: Pagination;
}

export function getTableLoadingData(length: number = 7): GetTableLoadingDataReturnInterface {
  const data: { id: string }[] = Array.from({ length }, (_, i) => ({
    id: i.toString(),
  }))

  const pagination: Pagination = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: length,
  };

  return { data, pagination }
}