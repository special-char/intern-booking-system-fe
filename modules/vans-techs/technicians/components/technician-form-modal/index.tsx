"use client";

import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { ManagerForm } from "@/modules/vans-techs/technicians/components/technician-form";
import { useState } from "react";

export function ManagerFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Add Manager
        </Button>
      </SheetTrigger>
      <ManagerForm setIsOpen={setIsOpen} />
    </Sheet>
  );
}
