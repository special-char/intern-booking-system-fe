"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { useTabs } from "@/hooks/use-tabs";
import { usePathname } from "next/navigation";

export function HomepageTabs() {
  const pathname: string = usePathname();

  const { onTabChange, activeTab } = useTabs({ value: pathname });

  return (
    <Tabs className="px-6 py-8" value={activeTab} onValueChange={onTabChange}>
      {/* <TabsList>
        <TabsTrigger value="/">
          All orders
        </TabsTrigger>
        <TabsTrigger value="/appointments">
          Appointments
        </TabsTrigger>
      </TabsList> */}
    </Tabs>
  );
}
