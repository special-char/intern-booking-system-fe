'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { useTabs } from "@/hooks/use-tabs";
import { TireSupplier } from "@/types/tire-supplier";
import { useParams } from "next/navigation";

interface TireSuppliersTabsProps {
  initActive: string
  suppliers: TireSupplier[]
}

export function TireSuppliersTabs({ initActive, suppliers }: TireSuppliersTabsProps) {
  const { slug } = useParams()
  const { onTabChange, activeTab } = useTabs({
    initValue: initActive,
    path: "/tire-suppliers",
    value: slug as string
  })

  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="px-3 py-5"
    >
      <TabsList>
        {suppliers.map(supplier => (
          <TabsTrigger key={supplier.slug} value={supplier.slug}>
            {supplier.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
