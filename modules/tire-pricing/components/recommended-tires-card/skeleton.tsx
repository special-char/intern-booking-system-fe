import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/shadcn/card";
import { Skeleton } from "@/components/shadcn/skeleton";
import { TireCardSkeleton } from "../tire-card/skeleton";


export default function RecommendedTiresCardSkeleton() {
  return (
    <Card>
      <CardHeader className="mb-7">
        <div className="flex justify-between items-center">
          <Skeleton variant="default" className="h-4 w-1/4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mt-4">
          {Array.from({ length: 5 }).map((_, index) => <TireCardSkeleton isAddMode={false} key={index} />)}
        </div>
      </CardContent>
    </Card>
  );
}
