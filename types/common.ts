export interface Pagination {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface PaginatedData {
  page: number;
  limit: number;
}