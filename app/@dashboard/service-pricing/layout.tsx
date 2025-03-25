import SearchInput from "@/components/common/search-input";
import { ServicePricingTabs } from "@/modules/service-pricing/common/components/tabs";

export default function ServicePricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-8 px-6">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">Service pricing</p>
        <SearchInput />
      </div>
      <ServicePricingTabs />
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
        <div className="lg:col-span-4 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}