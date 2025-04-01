import SearchInput from "@/components/common/search-input";
import { OrdersTabs } from "@/modules/orders/common/components/tabs";

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-8 space-y-5">
      <div className="flex justify-between max-w-full overflow-x-scroll overflow-y-hidden gap-5">
        <div className="flex items-center gap-5">
          <p className="text-text-primary font-semibold text-lg">Orders</p>
          <OrdersTabs />
        </div>
        <SearchInput className="min-w-50" />
      </div>
      {children}
    </div>
  )
}