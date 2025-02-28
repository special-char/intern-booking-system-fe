"use client";

import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { AddTechnicianForm } from "@/modules/vans-techs/technicians/components/add-technician-form";

export function AddTechnician() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Add Technician
        </Button>
      </SheetTrigger>
      <AddTechnicianForm />
    </Sheet>
  );
}
