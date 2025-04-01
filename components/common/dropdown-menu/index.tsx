import { Button } from "@/components/shadcn/button";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenu as DropdownMenuShadcn, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { ReactElement } from "react";

export interface DropdownMenuProps {
  data: {
    label: string
    value: string | number
  }[]
  labelFormatter?: (data: { label: string, value: string | number }) => string | ReactElement
  onSelect: (value: string | number) => void
  value: string
  valueFormatter?: (value: string) => string | ReactElement
}

export function DropdownMenu({ value, data, onSelect, valueFormatter, labelFormatter }: DropdownMenuProps) {
  return (
    <DropdownMenuShadcn>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white">
          {valueFormatter?.(value) ?? value}
          <Pencil className="ml-auto" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-52 overflow-y-auto">
        {data.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className={cn("flex items-center justify-between py-2.5", item.value === value && "!text-primary")}
            onSelect={() => onSelect(item.value)}
          >
            {labelFormatter?.(item) ?? item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuShadcn>
  );
}