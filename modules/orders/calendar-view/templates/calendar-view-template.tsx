import { Suspense } from "react";
import { Card, CardContent } from "@/components/shadcn/card";
import { OrdersCalendarTemplate } from "../components/calendar/template";
import { Header } from "../components/calendar/components/header";
import { OrdersCalendarSkeleton } from "../components/calendar/skeleton";

interface OrdersCalendarViewTemplateProps {
  date: string
}

export async function OrdersCalendarViewTemplate({ date }: OrdersCalendarViewTemplateProps) {
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-8 lg:col-span-2">
      </div>
      <div className="col-span-8 lg:col-span-6">
        <div className="mb-4">
          <Header date={date} />
        </div>
        <Card>
          <CardContent className="p-4">
            <Suspense fallback={<OrdersCalendarSkeleton />}>
              <OrdersCalendarTemplate date={date} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};