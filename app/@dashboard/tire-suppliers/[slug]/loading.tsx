import { TireSupplierAutoPaySkeleton } from "@/modules/tire-suppliers/components/auto-pay/skeleton";
import { TireSupplierConnectionKeySkeleton } from "@/modules/tire-suppliers/components/connection-key/skeleton";
import { TireSupplierConnectionStatusSkeleton } from "@/modules/tire-suppliers/components/connection-status/skeleton";
import { TireSupplierOrderCutoffSkeleton } from "@/modules/tire-suppliers/components/order-cutoff/skeleton";
import { TireSupplierReceivingSkeleton } from "@/modules/tire-suppliers/components/receiving/skeleton";

export default function TireSuppliersLoading() {
  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-8 lg:col-span-3 space-y-5">
        <TireSupplierConnectionKeySkeleton />
        <TireSupplierOrderCutoffSkeleton />
        <TireSupplierAutoPaySkeleton />
      </div>
      <div className="col-span-8 lg:col-span-5 space-y-5">
        <TireSupplierConnectionStatusSkeleton />
        <TireSupplierReceivingSkeleton />
      </div>
    </div>
  );
}