"use client";

import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { AddVanForm } from "@/modules/vans-techs/vans/components/add-van-form";
import { useState } from "react";

export function AddVan() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Add Van
        </Button>
      </SheetTrigger>
      <AddVanForm setIsOpen={setIsOpen} />
    </Sheet>
  );
}
