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

interface DateFilterProps<TData> {
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

export function DateFilter<TData>({ table }: DateFilterProps<TData>) {
  const handleValueChange = (value: string) => {
    const days = parseInt(value, 10);
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - days);

    table.setColumnFilters([
      {
        id: "date",
        value: threshold,
      },
    ]);
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-fit gap-2 bg-button-secondary-bg text-[13px] h-8">
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
