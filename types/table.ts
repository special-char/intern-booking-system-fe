import { PaginationInterface } from '@/types/pagination';
export interface GetColumnsInterface {
  isLoading: boolean
}

export interface TableProps {
  isLoading?: boolean,
  pagination: PaginationInterface
}