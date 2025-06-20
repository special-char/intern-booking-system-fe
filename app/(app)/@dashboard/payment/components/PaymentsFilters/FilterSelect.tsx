import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"

interface FilterSelectProps {
   value: string
   onValueChange: (value: string) => void
   options: { value: string; label: string }[]
   placeholder: string
   className?: string
}

export function FilterSelect({ value, onValueChange, options, placeholder, className }: FilterSelectProps) {
   return (
      <Select value={value} onValueChange={onValueChange}>
         <SelectTrigger className={`w-full sm:w-auto border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors text-xs h-9 ${className}`}>
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            {options.map((option) => (
               <SelectItem key={option.value} value={option.value}>
                  {option.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}
