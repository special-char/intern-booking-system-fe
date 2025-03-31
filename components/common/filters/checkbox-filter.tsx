import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { cn } from "@/lib/utils";

interface CheckboxFilterProps {
  checked: boolean
  className?: string
  id: string;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}

export function CheckboxFilter({ checked, className, id, label, onCheckedChange }: CheckboxFilterProps) {
  return (
    <div className={cn("flex items-center gap-3 pt-4 ml-6", className)}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label className="text-secondary" htmlFor={id}>
        {label}
      </Label>
    </div>
  );
}

