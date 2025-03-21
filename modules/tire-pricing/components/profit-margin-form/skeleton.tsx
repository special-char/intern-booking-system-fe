import { Input } from "@/components/shadcn/input";
import { Slider } from "@/components/shadcn/slider";
import { CardContent } from "@/components/shadcn/card";

import { Card, CardHeader } from "@/components/shadcn/card";
import { PercentIcon } from "lucide-react";
import { Skeleton } from "@/components/shadcn/skeleton";

export default function ProfitMarginFormSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton variant="default" className="h-4 w-1/4" />
      </CardHeader>
      <CardContent>
        <Input
          loading
          leftIcon={<PercentIcon size={16} />}
          wrapperClassName="max-w-32 mb-4 mt-1"
        />

        <Slider
          disabled
          value={[25]}
          max={100}
          step={1}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
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
