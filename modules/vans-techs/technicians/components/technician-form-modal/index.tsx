"use client";

import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { TechnicianForm } from "@/modules/vans-techs/technicians/components/technician-form";
import { useState } from "react";

export function TechnicianFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Add Technician
        </Button>
      </SheetTrigger>
      <TechnicianForm setIsOpen={setIsOpen} />
    </Sheet>
  );
}
