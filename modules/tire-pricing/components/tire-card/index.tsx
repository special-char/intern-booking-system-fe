import { Button } from "@/components/shadcn/button";
import { ChevronRightIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { Tire } from "@/types/tire";
import { Checkbox } from "@/components/shadcn/checkbox";
import TireDetailsForm from "../tire-details-form";

interface TireCardProps {
  tire: Tire;
  isEditMode?: boolean;
  isAddMode?: boolean;
  selected?: boolean;
  onSelect?: (tireId: string, selected: boolean) => void;
}

export default function TireCard({
  tire,
  isEditMode = false,
  isAddMode = false,
  selected = false,
  onSelect,
}: TireCardProps) {
  return (
    <div className="flex items-center justify-between">
      {isAddMode && (
        <Checkbox
          className="mr-3"
          checked={selected}
          onCheckedChange={(checked: boolean) =>
            onSelect && onSelect(tire.sku, checked)
          }
        />
      )}
      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg w-full">
        <Image
          src="/tire-placeholder.webp"
          alt={tire.title}
          width={52}
          height={52}
          className="rounded-md w-[52px] h-[52px] object-cover"
        />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-secondary">{tire.brand}</p>
          <p className="text-sm text-popover-foreground font-medium">{`${tire.model} ${tire.size}`}</p>
        </div>
        {!isEditMode && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="ml-auto" size="icon">
                <ChevronRightIcon className="w-4 h-4 text-text-secondary" />
              </Button>
            </SheetTrigger>
            <TireDetailsForm tire={tire} />
          </Sheet>
        )}
      </div>
      {isEditMode && (
        <Button variant="ghost" className="ml-auto" size="icon">
          <Trash2Icon className="w-4 h-4 text-icon-error" />
        </Button>
      )}
    </div>
  );
}
