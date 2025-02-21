import { Button } from "@/components/shadcn/button";
import { ArrowUpDown } from "lucide-react";
import { Table } from "@tanstack/react-table";

interface SortButtonProps<TData> {
  table: Table<TData>;
}

export function SortButton<TData>({ table }: SortButtonProps<TData>) {
  const dateColumn = table.getColumn("date");

  const isSorted = dateColumn?.getIsSorted();

  return (
    <Button
      variant="secondary"
      size="icon"
      className="h-8 w-8"
      onClick={() => {
        dateColumn?.toggleSorting(isSorted === "asc");
      }}
    >
      <ArrowUpDown className="w-4 h-4" />
    </Button>
  );
}
