import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { CalendarViewTemplate } from "@/modules/orders/calendar-view/templates/calendar-view-template";
import { MapViewTemplate } from "@/modules/orders/map-view/templates/map-view-template";
import { OrdersListViewTemplate } from "@/modules/orders/list-view/templates/orders-list-view-template";
import { List, Calendar, Table2 } from "lucide-react";
import { Metadata } from "next";
import SearchInput from "@/components/common/search-input";

export const metadata: Metadata = {
  title: "Treadcommand | Orders",
  description: "Treadcommand | Orders",
};

export default async function ListView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page as string) : 1;
  const limit = params.limit ? parseInt(params.limit as string) : 20;

  return (
    <Tabs defaultValue="list" className="px-6 py-8 gap-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <p className="text-text-primary font-semibold text-lg">Orders</p>
          <TabsList>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-1" />
              List
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar className="h-4 w-4 mr-1" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="map">
              <Table2 className="h-4 w-4 mr-1" />
              Map
            </TabsTrigger>
          </TabsList>
        </div>
        <SearchInput />
      </div>
      <TabsContent value="list">
        <OrdersListViewTemplate page={page} limit={limit} />
      </TabsContent>
      <TabsContent value="calendar">
        <CalendarViewTemplate />
      </TabsContent>
      <TabsContent value="map">
        <MapViewTemplate />
      </TabsContent>
    </Tabs>
  );
}
