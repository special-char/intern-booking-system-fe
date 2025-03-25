'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { useNestedPathname } from "@/hooks/use-nested-pathname";
import { useTabs } from "@/hooks/use-tabs";
import { Calendar, List, Route, Table2 } from "lucide-react";

export function OrdersTabs() {
  const { path } = useNestedPathname({})

  const { onTabChange, activeTab } = useTabs({
    path: "/orders",
    value: path
  })

  const iconClassname: string = "h-4 w-4 mr-1"

  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
    >
      <TabsList>
        <TabsTrigger value="list-view">
          <List className={iconClassname} />
          List
        </TabsTrigger>
        <TabsTrigger value="calendar-view">
          <Calendar className={iconClassname} />
          Calendar
        </TabsTrigger>
        <TabsTrigger value="map-view">
          <Table2 className={iconClassname} />
          Map
        </TabsTrigger>
        <TabsTrigger value="route-view">
          <Route className={iconClassname} />
          Route
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}