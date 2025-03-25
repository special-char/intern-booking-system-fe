import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import { Skeleton } from "@/components/shadcn/skeleton";

export function RevenueGoalCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton variant="default" className="h-4 w-1/4" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center mt-4">
          <Skeleton variant="ring" />
          <p className="text-muted-foreground text-xs mt-4">
            You&apos;ve reached
          </p>
          <Skeleton variant="default" className="w-full mt-4" />
        </div>
      </CardContent>
    </Card>
  );
}
