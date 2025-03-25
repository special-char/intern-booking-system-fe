import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/shadcn/card";
import { Skeleton } from "@/components/shadcn/skeleton";

export function RecentOrdersCardSkeleton() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <Skeleton variant="default" className="h-4 w-1/4" />
      </CardHeader>
      <CardContent>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center mt-4">
            <Skeleton variant="default" className="rounded-xl h-10 w-10 mr-3" />
            <div className="flex flex-col grow">
              <div className="flex gap-x-2 mt-1">
                <Skeleton variant="default" className="h-[14px] w-2/3" />
                <Skeleton variant="default" className="h-[14px] w-1/3" />
              </div>
              <Skeleton variant="default" className="h-[14px] w-1/2 mt-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
