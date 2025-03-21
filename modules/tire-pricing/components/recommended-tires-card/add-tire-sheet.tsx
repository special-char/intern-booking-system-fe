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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTires } from "@/mocks/tire";
import { TireCardSkeleton } from "../tire-card/skeleton";
import TireCard from "../tire-card";

export default function AddTireSheet() {
  const { isFetching, error, data: tires } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => getTires(false)
  })

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
      ? `Add ${selectedTires.length} tire${selectedTires.length !== 1 ? "s" : ""
      }`
      : "Add selected tire";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="lg" className="mt-4 w-full">
          Add tire
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-card">
        <SheetHeader>
          <SheetTitle>Add tire</SheetTitle>
        </SheetHeader>
        {error ? (
          <div className="text-center">Failed to fetch tires</div>
        ) : (
          <>
            <div className="py-1 px-4 flex flex-col gap-4 mt-4">
              <Input
                loading={isFetching}
                rightIcon={<Search size={16} className="text-text-placeholder" />}
                type="text"
                placeholder="Search tire"
              />
              {isFetching ? (
                <>
                  {Array.from({ length: 9 }).map((_, index) => <TireCardSkeleton isAddMode key={index} />)}
                </>
              ) : (
                <>
                  {tires?.map((tire) => (
                    <TireCard
                      key={tire.title}
                      tire={tire}
                      isAddMode
                      selected={selectedTires.includes(tire.sku)}
                      onSelect={handleSelect}
                    />
                  ))}
                </>
              )}
            </div>
            <SheetFooter>
              <Button onClick={handleAddTire}>
                <PlusIcon /> {buttonText}
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
