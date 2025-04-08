"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { useUpdateQueryParams } from "@/hooks/use-update-query-params";
export interface TabItem {
  value: string;
  label: string;
  count?: number;
  triggerClassName?: string;
}

export interface StatusTabsProps {
  defaultValue: string;
  tabs: TabItem[];
  listClassName?: string;
}

export function StatusTabs({
  defaultValue,
  tabs,
  listClassName,
}: StatusTabsProps) {
  const { updateQueryParams } = useUpdateQueryParams();

  function handleValueChange(value: string) {
    updateQueryParams({ status: value });
  }

  return (
    <Tabs defaultValue={defaultValue} onValueChange={handleValueChange}>
      <TabsList className={listClassName}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={
              tab.triggerClassName ||
              "data-[state=active]:bg-white data-[state=active]:[&>span]:bg-gray-50 data-[state=active]:[&>span]:rounded-full data-[state=active]:[&>span]:py-0.5 data-[state=active]:[&>span]:px-2 h-8"
            }
          >
            {tab.label}
            {typeof tab.count !== "undefined" && (
              <span className="ml-1 text-[12px]">({tab.count})</span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
