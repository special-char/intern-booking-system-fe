import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import { Button } from "@/components/shadcn/button";
import { Loader2Icon, Undo2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Tooltip } from "@/components/common/tooltip";
import TerritoryToggle from "../territory-toggle";

interface PricingCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isLoading?: boolean;
  stateEnvironment?: boolean;
}

export default function PricingCard({
  children,
  title,
  description,
  isLoading,
  stateEnvironment,
}: PricingCardProps) {
  const { reset } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-text-primary font-semibold">
          {title}
          <Tooltip>
            <p>{description}</p>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="px-2 py-3 bg-bg-secondary rounded-lg">{children}</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pb-5 px-5">
        <Button
          onClick={() => reset()}
          variant="ghost"
          type="reset"
          className="px-0 hover:bg-transparent"
        >
          <Undo2Icon className="w-4 h-4" />
          Reset all changes
        </Button>
        <div className="flex items-center gap-5">
          {!stateEnvironment && <TerritoryToggle />}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2Icon className="w-4 h-4" /> : "Save"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
