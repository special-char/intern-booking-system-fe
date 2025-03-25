import { Skeleton } from "@/components/shadcn/skeleton";
import { Input } from "@/components/shadcn/input";
import { PricingCardSkeleton } from "../../../common/components/pricing-card/skeleton";

export function FeeFormSkeleton() {
  return (
    <PricingCardSkeleton>
      <div className="flex justify-between items-center">
        <Skeleton variant="default" className="h-4 w-1/4" />

        <Input
          wrapperClassName="mt-[6px] max-w-46 grow"
          skeletonClassName="!left-auto right-3"
          loading
        />
      </div>
    </PricingCardSkeleton>
  );
}