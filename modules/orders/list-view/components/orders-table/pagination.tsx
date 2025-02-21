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

interface PaginationProps<TData> {
  table: TableType<TData>;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-text-primary">
        Showing{" "}
        {table.getState().pagination.pageSize *
          table.getState().pagination.pageIndex +
          1}{" "}
        to{" "}
        {Math.min(
          table.getState().pagination.pageSize *
            (table.getState().pagination.pageIndex + 1),
          table.getFilteredRowModel().rows.length
        )}
      </p>
      <ShadcnPagination className="justify-end w-fit mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                table.previousPage();
              }}
              className={
                !table.getCanPreviousPage()
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
          {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
            .slice(0, 3)
            .map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(pageNumber - 1);
                  }}
                  isActive={
                    table.getState().pagination.pageIndex === pageNumber - 1
                  }
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
          {table.getPageCount() > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {table.getPageCount() > 3 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.setPageIndex(table.getPageCount() - 1);
                }}
              >
                {table.getPageCount()}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                table.nextPage();
              }}
              className={
                !table.getCanNextPage() ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
        <Select onValueChange={(value) => table.setPageSize(Number(value))}>
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
