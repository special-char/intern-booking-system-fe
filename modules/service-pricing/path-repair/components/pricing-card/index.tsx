import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import { Button } from "@/components/shadcn/button";
import { Undo2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Tooltip } from "@/components/common/tooltip";

interface PricingCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function PricingCard({
  children,
  title,
  description,
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
          className="px-0 hover:bg-transparent"
        >
          <Undo2Icon className="w-4 h-4" />
          Reset all changes
        </Button>
        <Button type="submit">Save</Button>
      </CardFooter>
    </Card>
  );
}
