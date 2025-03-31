import { OrdersCalendarTemplate } from "../components/calendar/template"
import { Header } from "../components/calendar/components/header"
import { Suspense } from "react"
import { OrdersCalendarSkeleton } from "../components/calendar/skeleton"
import { FiltersPanel } from "../components/filters-panel"


interface OrdersCalendarViewTemplateProps {
  date: string
  filters: Record<string, boolean>
}

export async function OrdersCalendarViewTemplate({ date, filters }: OrdersCalendarViewTemplateProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="order-1 lg:order-none">
        <FiltersPanel date={date} />
      </div>
      <div className="grow order-none lg:order-1">
        <div className="mb-5">
          <Header date={date} />
        </div>
        <div className="border border-t-0 shadow-card rounded-lg">
          <Suspense key={`${date}-${JSON.stringify(filters)}`} fallback={<OrdersCalendarSkeleton />}>
            <OrdersCalendarTemplate date={date} />
          </Suspense>
        </div>
      </div>
    </div>
  )
};