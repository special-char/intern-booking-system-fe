'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { TireSupplier } from "@/types/tire-supplier";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

interface TireSuppliersTabsProps {
  active: string
  suppliers: TireSupplier[]
}

export function TireSuppliersTabs({ active, suppliers }: TireSuppliersTabsProps) {
  const { slug } = useParams()
  const router = useRouter()
  const [activeSlug, setActiveSlug] = useState((slug as string) ?? active)

  useEffect(() => {
    handleTabChange(activeSlug, "replace")
  }, [])

  function handleTabChange(slug: string, type: "replace" | "push"): void {
    setActiveSlug(slug)
    router[type](`/tire-suppliers/${slug}`)
  }

  return (
    <Tabs
      value={activeSlug}
      onValueChange={(slug) => handleTabChange(slug, "push")}
      className="px-3 py-4"
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
