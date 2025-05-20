"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { useNestedPathname } from "@/hooks/use-nested-pathname";
import { useTabs } from "@/hooks/use-tabs";

export function ServicePricingTabs() {
  const { path } = useNestedPathname({});

  const { onTabChange, activeTab } = useTabs({
    path: "/service-pricing",
    value: path,
  });

  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="py-5 max-w-full overflow-x-scroll overflow-y-hidden"
    >
      <TabsList>
        <TabsTrigger value="trip-charge">Trip Charge</TabsTrigger>
        <TabsTrigger value="install">Install</TabsTrigger>
        <TabsTrigger value="patch-repair">Patch Repair</TabsTrigger>
        <TabsTrigger value="balance-rotation">Balance & Rotation</TabsTrigger>
        <TabsTrigger value="fees">Fees</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
