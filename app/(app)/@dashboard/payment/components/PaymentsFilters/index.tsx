import { Search } from "lucide-react"
import { Input } from "@/components/shadcn/input"
import { FilterSelect } from "./FilterSelect"

interface PaymentsFiltersProps {
   searchTerm: string
   onSearchChange: (value: string) => void
   monthFilter: string
   onMonthChange: (value: string) => void
   yearFilter: string
   onYearChange: (value: string) => void
   statusFilter: string
   onStatusChange: (value: string) => void
   methodFilter: string
   onMethodChange: (value: string) => void
   months: string[]
   years: string[]
}

export function PaymentsFilters({
   searchTerm,
   onSearchChange,
   monthFilter,
   onMonthChange,
   yearFilter,
   onYearChange,
   statusFilter,
   onStatusChange,
   methodFilter,
   onMethodChange,
   months,
   years,
}: PaymentsFiltersProps) {
   const statusOptions = [
      { value: "all", label: "All Status" },
      { value: "captured", label: "Captured" },
      { value: "authorized", label: "Authorized" },
      { value: "failed", label: "Failed" },
      { value: "created", label: "Created" },
      { value: "paid", label: "Paid" },
      { value: "attempted", label: "Attempted" },
   ]

   const methodOptions = [
      { value: "all", label: "All Methods" },
      { value: "card", label: "Card" },
      { value: "netbanking", label: "Net Banking" },
      { value: "wallet", label: "Wallet" },
      { value: "upi", label: "UPI" },
      { value: "order", label: "Order" },
   ]

   return (
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
         <div className="relative flex-1 max-w-full w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <Input
               placeholder="Search by payment ID, email, contact, or order ID..."
               value={searchTerm}
               onChange={(e) => onSearchChange(e.target.value)}
               className="pl-12 pr-10 py-2 bg-white border border-gray-200 rounded-full shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-gray-800 transition-all placeholder-gray-400 w-full"
            />
         </div>

         <FilterSelect
            value={monthFilter}
            onValueChange={onMonthChange}
            options={months.map((month) => ({ value: month, label: month }))}
            placeholder="Month"
            className="sm:max-w-[140px]"
         />

         <FilterSelect
            value={yearFilter}
            onValueChange={onYearChange}
            options={years.map((year) => ({ value: year, label: year }))}
            placeholder="Year"
            className="sm:max-w-[120px]"
         />

         <FilterSelect
            value={statusFilter}
            onValueChange={onStatusChange}
            options={statusOptions}
            placeholder="All Status"
            className="sm:max-w-[150px]"
         />

         <FilterSelect
            value={methodFilter}
            onValueChange={onMethodChange}
            options={methodOptions}
            placeholder="All Methods"
            className="sm:max-w-[150px]"
         />
      </div>
   )
}
