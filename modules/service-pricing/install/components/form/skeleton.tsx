import { Input } from "@/components/shadcn/input";

import { Skeleton } from "@/components/shadcn/skeleton";
import { PricingCardSkeleton } from "../../../common/components/pricing-card/skeleton";

interface InstallFormSkeletonProps {
  rowsNum?: number;
}

export default function InstallFormSkeleton({ rowsNum = 4 }: InstallFormSkeletonProps) {
  return (
    <PricingCardSkeleton>
      <div className="grid grid-cols-4 gap-4 mb-1 font-semibold">
        <p></p>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} variant="default" className="h-4 w-3/4" />
        ))}
      </div>

      {Array.from({ length: rowsNum }).map((_, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 mb-4 items-center">
          <Skeleton variant="default" className="h-4 w-3/4" />

          {Array.from({ length: 3 }).map((_, index) => (
            <Input
              key={index}
              wrapperClassName="mt-[6px]"
              skeletonClassName="!left-auto right-3"
              loading
            />
          ))}
        </div>
      ))}
    </PricingCardSkeleton>
  );
}
