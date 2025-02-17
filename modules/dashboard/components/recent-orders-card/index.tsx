import { InfoIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";

interface Order {
  initials: string;
  name: string;
  amount: number;
  timestamp: string;
}

const orders: Order[] = [
  {
    initials: "HM",
    name: "Henry Matties",
    amount: 1159.34,
    timestamp: "5 minutes ago",
  },
  {
    initials: "RS",
    name: "Rob Silvia",
    amount: 1159.34,
    timestamp: "5 minutes ago",
  },
  {
    initials: "JH",
    name: "Jerry Horton",
    amount: 1159.34,
    timestamp: "5 minutes ago",
  },
  {
    initials: "SG",
    name: "Sophia Garcia",
    amount: 1159.34,
    timestamp: "5 minutes ago",
  },
  {
    initials: "EN",
    name: "Ethan Nguyen",
    amount: 1159.34,
    timestamp: "5 minutes ago",
  },
  {
    initials: "OP",
    name: "Olivia Patel",
    amount: 1159.34,
    timestamp: "5 minutes ago",
  },
];

export default function RecentOrdersCard() {
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
        {orders.map((order) => (
          <div key={order.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-avatar-bg-alt text-text-primary rounded-xl">
                <AvatarFallback className="bg-avatar-bg-alt">
                  {order.initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <span className="font-medium text-sm text-popover-foreground">
                  {order.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {order.timestamp}
                </span>
              </div>
            </div>
            <span className="font-bold text-sm text-[#3E9B4F]">
              ${order.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
