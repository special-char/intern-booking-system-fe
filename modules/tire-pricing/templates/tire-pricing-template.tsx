import SearchInput from "@/components/common/search-input";

import { TireProfitTemplate } from "./tire-profit-template";
import { Suspense } from "react";
import ProfitMarginFormSkeleton from "../components/profit-margin-form/skeleton";
import RangeProfitFormSkeleton from "../components/range-profit-form/skeleton";
import { RecommendedTiresCardTemplate } from "../components/recommended-tires-card/template";
import RecommendedTiresCardSkeleton from "../components/recommended-tires-card/skeleton";
export function TirePricingTemplate() {
  return (
    <div className="py-8 px-6 space-y-5">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-2xl">Tire Pricing</p>
        <SearchInput />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-8 gap-5">
        <div className="xl:col-span-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <Suspense
              fallback={
                <>
                  <ProfitMarginFormSkeleton />
                  <RangeProfitFormSkeleton />
                </>
              }
            >
              <TireProfitTemplate />
            </Suspense>
          </div>
        </div>
        <div className="xl:col-span-2">
          <Suspense fallback={<RecommendedTiresCardSkeleton />}>
            <RecommendedTiresCardTemplate />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
