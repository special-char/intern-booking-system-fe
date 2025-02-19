import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import AppointmentsTemplate from "@/modules/dashboard/templates/appointments-template";
import OrdersTemplate from "@/modules/dashboard/templates/orders-template";

export default function Home() {
  return (
    <Tabs defaultValue="orders" className="px-6 py-8">
      <TabsList>
        <TabsTrigger value="orders">All orders</TabsTrigger>
        <TabsTrigger value="appointments">Appointments</TabsTrigger>
      </TabsList>
      <TabsContent value="orders">
        <OrdersTemplate />
      </TabsContent>
      <TabsContent value="appointments">
        <AppointmentsTemplate />
      </TabsContent>
    </Tabs>
  );
}
