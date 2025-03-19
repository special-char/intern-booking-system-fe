import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { cn } from "@/lib/utils";
import { flexRender, ColumnDef, HeaderGroup } from "@tanstack/react-table";
import { Table as TableType } from "@tanstack/react-table";

interface ContentTableProps<TData, TValue> {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  isHeaderGrouping?: boolean
  rowCn?: string
}

export function ContentTable<TData, TValue>({
  table,
  columns,
  isHeaderGrouping,
  rowCn
}: ContentTableProps<TData, TValue>) {
  const headerGroups: HeaderGroup<TData>[] = table.getHeaderGroups()
  const maxHeaderDepth: number = headerGroups.length

  return (
    <Table>
      <TableHeader>
        {headerGroups.map((headerGroup, groupIndex) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const centerVertical: boolean = !!header.column.columnDef.meta?.center?.vertical;
              const centerHorizontal: boolean = !!header.column.columnDef.meta?.center?.horizontal;
              const border: boolean = !!header.column.columnDef.meta?.border;

              const thClassName: string = cn("uppercase", border && "border-r border-[var(--color-border)]", centerHorizontal && "text-center")

              if (!isHeaderGrouping) {
                return (
                  <TableHead
                    key={header.id}
                    className={thClassName}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              }

              if (centerVertical) {
                // render first row
                if (!groupIndex) {
                  return (
                    <TableHead
                      key={header.id}
                      rowSpan={maxHeaderDepth}
                      className={thClassName}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                }
                // skip the vertically aligned columns in subsequent rows
                return null
              }

              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={thClassName}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={cn(rowCn)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={cn(cell.column.columnDef.meta?.border && "border-r border-[var(--color-border)]")}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
