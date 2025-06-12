import { TableHeader as ShadcnTableHeader, TableRow, TableHead } from "@/components/shadcn/table"

export function TableHeader() {
   return (
      <ShadcnTableHeader>
         <TableRow className="bg-gray-100 border-b border-gray-200">
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Payment ID
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Customer
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
               Amount
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Status
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Method
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Date
            </TableHead>
            <TableHead className="w-12"></TableHead>
         </TableRow>
      </ShadcnTableHeader>
   )
}
