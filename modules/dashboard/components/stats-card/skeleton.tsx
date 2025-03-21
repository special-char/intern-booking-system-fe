import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import { Skeleton } from "@/components/shadcn/skeleton";

export function StatsCardSkeleton() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <Skeleton variant="default" className="h-4 w-1/4" />
      </CardHeader>
      <CardContent>
        <Skeleton variant="default" className="mt-3 w-full" />
        <div className="flex gap-x-1">
          <Skeleton variant="default" className="h-4 w-1/4 mt-4" />
          <Skeleton variant="default" className="h-4 w-1/4 mt-4" />
        </div>
      </CardContent>
    </Card>
  );
}