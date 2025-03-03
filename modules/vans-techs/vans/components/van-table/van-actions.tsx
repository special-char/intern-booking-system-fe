import { useState } from "react";
import { Button } from "@/components/shadcn/button";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Sheet } from "@/components/shadcn/sheet";
import { AddVanForm } from "../add-van-form";
import { Van } from "./columns";

export default function VanActions({ van }: { van: Van }) {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 h-fit flex items-center justify-center"
            size="sm"
          >
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setSheetOpen(true);
            }}
          >
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <AddVanForm van={van} />
      </Sheet>
    </>
  );
}
