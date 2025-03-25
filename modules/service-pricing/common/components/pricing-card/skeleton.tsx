import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/shadcn/card";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Undo2Icon } from "lucide-react";
import { PropsWithChildren } from "react";

export function PricingCardSkeleton({ children }: PropsWithChildren) {
  return (
    <Card>
      <CardHeader>
        <Skeleton variant="default" className="h-4 w-1/4" />
      </CardHeader>
      <CardContent className="mt-4">
        <div className="px-2 py-3 bg-bg-secondary rounded-lg">
          {children}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pb-5 px-5">
        <Button
          disabled
          variant="ghost"
          className="px-0 hover:bg-transparent"
        >
          <Undo2Icon className="w-4 h-4" />
          Reset all changes
        </Button>
        <Button type="submit" disabled>Save</Button>
      </CardFooter>
    </Card>
  );
}
