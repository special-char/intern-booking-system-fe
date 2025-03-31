import { AccordionTrigger } from "@/components/shadcn/accordion";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { cn } from "@/lib/utils";

interface CheckboxFilterAccordionProps {
  checked: boolean
  className?: string
  id: string;
  label: string;
  onCheckedChange: (checked: boolean) => void;
  onTriggerClick?: () => void;
}

export function CheckboxFilterAccordion({ checked, className, id, label, onCheckedChange, onTriggerClick }: CheckboxFilterAccordionProps) {
  return (
    <div className={cn("flex items-center justify-between pt-4 px-3", className)}>
      <div className="flex items-center gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label className="text-secondary" htmlFor={id}>
          {label}
        </Label>
      </div>
      <AccordionTrigger
        className="p-0 m-0 -mt-1"
        onClick={onTriggerClick}
      />
    </div>
  );
}

