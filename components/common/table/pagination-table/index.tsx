import { SelectGroup } from "@/components/shadcn/select";
import { SelectContent } from "@/components/shadcn/select";
import { SelectValue } from "@/components/shadcn/select";
import { SelectItem } from "@/components/shadcn/select";
import { SelectTrigger } from "@/components/shadcn/select";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn/pagination";
import { Select } from "@/components/shadcn/select";
import { Table as TableType } from "@tanstack/react-table";
import { PaginationInterface } from "@/types/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationTableProps<TData> {
  table: TableType<TData>;
  pagination: PaginationInterface;
}

function getPaginationRange(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  } else if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  } else {
    return [1, "...", currentPage, "...", totalPages];
  }
}

export function PaginationTable<TData>({
  pagination,
}: PaginationTableProps<TData>) {
  const { pageIndex, pageSize, totalCount } = pagination;
  const currentPage = pageIndex;
  const totalPages = Math.ceil(totalCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  const paginationRange = getPaginationRange(currentPage, totalPages);
  const adjustedPageIndex = pageIndex - 1;
  const startIndex = adjustedPageIndex * pageSize;
  const currentPageCount =
    startIndex < totalCount ? Math.min(pageSize, totalCount - startIndex) : 0;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-text-primary">
        Showing {currentPageCount} of {totalCount}
      </p>
      <ShadcnPagination className="justify-end w-fit mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          {paginationRange.map((page, idx) => (
            <PaginationItem key={idx}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(page as number)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
        <Select
          onValueChange={(value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("limit", value);
            router.push(`?${params.toString()}`);
          }}
        >
          <SelectTrigger className="w-[120px] text-sm">
            <SelectValue placeholder="20/page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="200">200</SelectItem>
              <SelectItem value="500">500</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ShadcnPagination>
    </div>
  );
}
