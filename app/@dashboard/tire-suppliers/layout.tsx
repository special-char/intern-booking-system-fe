import SearchInput from "@/components/common/search-input";
import { Skeleton } from "@/components/shadcn/skeleton";
import TireSuppliersTabsTemplate from "@/modules/tire-suppliers/components/tabs/template";
import { Suspense } from "react";

export default function TireSuppliersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-8 px-6">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Tire Suppliers</p>
        <SearchInput className="min-w-[320px]" />
      </div>
      <Suspense fallback={<Skeleton className="w-1/4 h-8 my-4" />}>
        <TireSuppliersTabsTemplate />
      </Suspense>
      {children}
    </div>
  );
}