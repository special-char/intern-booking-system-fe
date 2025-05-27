"use client";

import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Row } from "@tanstack/react-table";
import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface DateFilterProps<TData> {
  disabled?: boolean;
  table: Table<TData>;
}

export function dateRangeFilterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: Date
) {
  const rowDate = new Date(row.getValue(columnId));
  rowDate.setHours(0, 0, 0, 0);

  const filterDate = new Date(filterValue);
  filterDate.setHours(0, 0, 0, 0);

  return rowDate >= filterDate;
}

export function DateFilter<TData>({ disabled, table }: DateFilterProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleValueChange(value: string) {
    const days = parseInt(value, 10);
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - days);

    // Update URL search params first
    const params = new URLSearchParams(searchParams);
    params.set('dateFilter', threshold.toISOString());

    // Use replace instead of push to avoid adding to history stack
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger
        disabled={disabled}
        className="w-fit gap-2 bg-button-secondary-bg text-[13px] h-8"
      >
        <CalendarIcon className="w-3 h-3" />
        <SelectValue placeholder="Select a date" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7">Last 7 days</SelectItem>
        <SelectItem value="30">Last 30 days</SelectItem>
        <SelectItem value="90">Last 90 days</SelectItem>
        <SelectItem value="180">Last 180 days</SelectItem>
        <SelectItem value="365">Last 365 days</SelectItem>
      </SelectContent>
    </Select>
  );
}