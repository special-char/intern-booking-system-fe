import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { cn } from "@/lib/utils";
import { getLocalTodayDateString } from "@/utils/date";
import { PencilIcon } from "lucide-react";
import { useState } from "react";


interface DateInputProps {
  date: Date
  dateFormatter?: (date: Date) => string
  getIsDisabled?: (date: Date) => boolean
  onChange: (date?: Date) => void
}

export function DateInput({ date, onChange, dateFormatter, getIsDisabled }: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(date?: Date): void {
    onChange(date)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(!date && "text-muted-foreground")}
        >
          {date ? (
            dateFormatter?.(date) ?? getLocalTodayDateString(date)
          )
            : (
              <span>Pick a date</span>
            )}
          <PencilIcon className="ml-auto" size={16} />
        </Button>

      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(date)}
          onSelect={handleChange}
          disabled={(date) => getIsDisabled?.(date) ?? false}
        />
      </PopoverContent>
    </Popover>
  );
}