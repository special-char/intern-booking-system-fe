import { InfoIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";
import { formatRelativeTime } from "@/utils/time";
import { getOrderList } from "@/lib/data/order";

export default async function RecentOrdersCard() {
  const orders = await getOrderList({ page: 1, limit: 10 });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium text-text-secondary">
            Recent orders
          </CardTitle>
          <InfoIcon className="h-4 w-4 text-text-secondary" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {orders?.orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-avatar-bg-alt text-text-primary rounded-xl">
                <AvatarFallback className="bg-avatar-bg-alt">
                  {order.shipping_address?.first_name?.charAt(0)}
                  {order.shipping_address?.last_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <span className="font-medium text-sm text-popover-foreground">
                  {order.shipping_address?.first_name}{" "}
                  {order.shipping_address?.last_name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(order.created_at)}
                </span>
              </div>
            </div>
            <span className="font-bold text-sm text-[#3E9B4F]">
              ${order.summary.current_order_total.toFixed(2)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
