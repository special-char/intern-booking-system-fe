import { Button } from "@/components/shadcn/button"

interface TablePaginationProps {
   currentPage: number
   totalPages: number
   totalItems: number
   pageSize: number
   onPageChange: (page: number) => void
}

export function TablePagination({
   currentPage,
   totalPages,
   totalItems,
   pageSize,
   onPageChange,
}: TablePaginationProps) {
   if (totalPages <= 1) return null

   return (
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
         <div className="text-sm text-gray-600">
            <span>Showing </span>
            <span className="font-semibold">{Math.min(pageSize, totalItems)}</span>
            <span> of </span>
            <span className="font-semibold">{totalItems}</span>
            <span> transactions</span>
         </div>
         <div className="flex items-center gap-2">
            <Button
               variant="outline"
               size="sm"
               disabled={currentPage === 1}
               onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            >
               Previous
            </Button>
            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
               const pageNum = currentPage <= 3 ? idx + 1 : currentPage - 2 + idx
               if (pageNum > totalPages) return null
               return (
                  <Button
                     key={pageNum}
                     variant="outline"
                     size="sm"
                     className={currentPage === pageNum ? "bg-indigo-50 text-indigo-700 border-indigo-300" : ""}
                     onClick={() => onPageChange(pageNum)}
                  >
                     {pageNum}
                  </Button>
               )
            })}
            <Button
               variant="outline"
               size="sm"
               disabled={currentPage === totalPages}
               onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            >
               Next
            </Button>
         </div>
      </div>
   )
}
