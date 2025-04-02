import { ToolsIcon } from "@/icons/tools";
import { OrdersRouteView } from "@/types/orders/orders-route-view";
import { Eye } from "lucide-react";

interface DriversPanelProps {
  ordersRouteView: OrdersRouteView[];
}

export function DriversPanel({ ordersRouteView }: DriversPanelProps) {
  return (
    <div className="flex-shrink-0 border-r border-border-primary bg-white w-fit mt-[37px]">
      {ordersRouteView.map(
        ({ driver, totalTireInstallation, totalTireInspection }) => (
          <div
            key={driver.id}
            className="flex items-center gap-2 border-b border-border-primary px-4"
            style={{ height: "62px", lineHeight: "62px" }}
          >
            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">
                {driver.name.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-medium text-text-primary">
              {driver.name}
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center gap-1 text-purple-600 bg-purple-50 rounded-lg p-1">
                <ToolsIcon className="w-4 h-4" />
                <span className="text-xs font-semibold">
                  {totalTireInstallation}
                </span>
              </div>
              <div className="flex items-center gap-1 text-orange-600 bg-orange-50 rounded-lg p-1">
                <Eye className="w-4 h-4" />
                <span className="text-xs font-semibold">
                  {totalTireInspection}
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
