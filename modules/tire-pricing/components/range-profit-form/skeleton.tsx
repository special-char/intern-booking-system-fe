import { Input } from "@/components/shadcn/input";
import { Range } from "@/components/shadcn/slider";
import { CardContent } from "@/components/shadcn/card";
import { CircleDollarSign } from "lucide-react";

import { Card, CardHeader } from "@/components/shadcn/card";

import { Skeleton } from "@/components/shadcn/skeleton";
export default function RangeProfitFormSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton variant="default" className="h-4 w-1/4" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-3 mb-4 mt-1 w-full">
          <Input
            wrapperClassName="w-full"
            leftIcon={<CircleDollarSign size={16} />}
            loading
          />
          <Input
            wrapperClassName="w-full"
            leftIcon={<CircleDollarSign size={16} />}
            loading
          />
        </div>

        <Range
          disabled
          min={0}
          max={100}
          value={[25, 50]}
        />
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} variant="default" className="w-7 h-2 mt-1" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
