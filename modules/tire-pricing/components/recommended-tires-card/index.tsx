"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { EditIcon } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import TireCard from "../tire-card";
import { useState } from "react";
import AddTireSheet from "./add-tire-sheet";
import { Tire } from "@/types/tire";

interface RecommendedTiresCardProps {
  tires: Tire[];
}

export default function RecommendedTiresCard({ tires }: RecommendedTiresCardProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center -mt-2">
          <CardTitle className="text-text-secondary font-medium text-sm">
            Recommended tires
          </CardTitle>
          {isEditMode ? (
            <Button
              onClick={() => setIsEditMode(false)}
              className="text-text-primary-brand"
              variant="ghost"
            >
              Save
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditMode(true)}
            >
              <EditIcon className="w-4 h-4 text-text-secondary" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mt-4">
          {tires.map((tire) => (
            <TireCard key={tire.title} tire={tire} isEditMode={isEditMode} />
          ))}
        </div>
      </CardContent>
      {isEditMode && <CardFooter><AddTireSheet /></CardFooter>}
    </Card>
  );
}