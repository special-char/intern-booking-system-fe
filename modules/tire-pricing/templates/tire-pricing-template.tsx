"use client";

import SearchInput from "@/components/common/search-input";

import ProfitMarginForm from "../components/profit-margin-form";
import RangeProfitForm from "../components/range-profit-form";
import RecommendedTiresCard from "../components/recommended-tires-card";
export function TirePricingTemplate() {
  return (
    <div className="py-8 px-6 space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-2xl">Tire Pricing</p>
        <SearchInput />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-8 gap-5">
        <div className="xl:col-span-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <ProfitMarginForm />
            <RangeProfitForm />
          </div>
        </div>
        <div className="xl:col-span-2">
          <RecommendedTiresCard />
        </div>
      </div>
    </div>
  );
}
