import SearchInput from "@/components/common/search-input";
import { SelectTerritory } from "@/modules/service-pricing/common/components/select-territory";
import { ServicePricingTabs } from "@/modules/service-pricing/common/components/tabs";
import { TerritoryProvider } from "@/contexts/territory-context";
import { fetchAllTerritories } from "@/lib/data/service-pricing";
import ServiceChart from "@/modules/service-pricing/common/components/service-chart";

export default async function ServicePricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const territories = await fetchAllTerritories();

  return (
    <TerritoryProvider>
      <div className="py-8 px-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold">Service pricing</p>
            <SelectTerritory territories={territories.docs} />
          </div>
          <SearchInput />
        </div>
        <ServicePricingTabs />
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
          <div className="lg:col-span-4 space-y-3">{children}</div>
          <ServiceChart />
        </div>
      </div>
    </TerritoryProvider>
  );
}
