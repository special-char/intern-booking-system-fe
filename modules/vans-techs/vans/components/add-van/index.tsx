"use client";

import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { AddVanForm } from "@/modules/vans-techs/vans/components/add-van-form";

export function AddVan() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Add Van
        </Button>
      </SheetTrigger>
      <AddVanForm />
    </Sheet>
  );
}
