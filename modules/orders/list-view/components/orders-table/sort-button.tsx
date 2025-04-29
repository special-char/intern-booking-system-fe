import { Button } from "@/components/shadcn/button";
import { ArrowUpDown } from "lucide-react";
import { Table } from "@tanstack/react-table";

interface SortButtonProps<TData> {
  disabled?: boolean
  table: Table<TData>;
}

export function SortButton<TData>({ disabled, table }: SortButtonProps<TData>) {
  const dateColumn = table.getColumn("created_at"); //TODO: change to Column name
  const isSorted = dateColumn?.getIsSorted();

  return (
    <Button
      disabled={disabled}
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
