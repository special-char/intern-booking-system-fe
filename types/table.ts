import { Pagination } from '@/types/common';
export interface GetColumnsInterface {
  isLoading?: boolean
}

export interface TableProps {
  isLoading?: boolean,
  pagination: Pagination
}