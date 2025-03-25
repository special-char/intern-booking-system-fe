export interface PaginationInterface {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface PaginatedDataInterface {
  page: number;
  limit: number;
}