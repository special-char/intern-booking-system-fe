import { Skeleton } from "@/components/shadcn/skeleton";
import { PricingCardSkeleton } from "../../../common/components/pricing-card/skeleton";
import { Input } from "@/components/shadcn/input";
import { CircleDollarSign } from "lucide-react";
import { Switch } from "@/components/shadcn/switch";

export default function TripChargeFormSkeleton() {
  return (
    <PricingCardSkeleton>
      <div className="flex justify-between items-center">
        <div className="w-full">
          <Skeleton variant="default" className="h-4 w-1/4" />
          <Input
            loading
            wrapperClassName="max-w-51 mt-[6px]"
            leftIcon={<CircleDollarSign className="w-4 h-4 text-icon-fg" />}
            disabled
          />
        </div>

        <Switch
          checked
          disabled
          size="large"
        />
      </div>
    </PricingCardSkeleton>
  )
}