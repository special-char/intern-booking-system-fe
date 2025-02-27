"use client";

import { PlusIcon } from "lucide-react";

import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet";

import { Button } from "@/components/shadcn/button";

import { Sheet } from "@/components/shadcn/sheet";
import { Input } from "@/components/shadcn/input";
import { Search } from "lucide-react";
import TireCard from "./tire-card";
import { Tire } from "@/types/tire";
import { useState } from "react";

interface AddTireSheetProps {
  tires: Tire[];
}

export default function AddTireSheet({ tires }: AddTireSheetProps) {
  const [selectedTires, setSelectedTires] = useState<string[]>([]);

  const handleSelect = (tireId: string, selected: boolean) => {
    setSelectedTires((prev) =>
      selected ? [...prev, tireId] : prev.filter((id) => id !== tireId)
    );
  };

  const handleAddTire = () => {
    console.log("Selected tire ids:", selectedTires);
  };

  const buttonText =
    selectedTires.length > 0
      ? `Add ${selectedTires.length} tire${
          selectedTires.length !== 1 ? "s" : ""
        }`
      : "Add selected tire";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="lg" className="mt-4 w-full">
          Add tire
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add tire</SheetTitle>
        </SheetHeader>
        <div className="px-4 py-1">
          <Input
            rightIcon={<Search size={16} className="text-text-placeholder" />}
            type="text"
            placeholder="Search tire"
          />
        </div>

        {tires.map((tire) => (
          <TireCard
            key={tire.title}
            tire={tire}
            isAddMode
            selected={selectedTires.includes(tire.sku)}
            onSelect={handleSelect}
          />
        ))}
        <SheetFooter>
          <Button onClick={handleAddTire}>
            <PlusIcon /> {buttonText}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
