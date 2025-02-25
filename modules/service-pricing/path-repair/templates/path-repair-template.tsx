import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";

import TripChargeForm from "../components/trip-charge-form";
import SearchInput from "@/components/common/search-input";

import InstallOnlyForm from "../components/install-only-form";
import InstallBundleForm from "../components/install-bundle-form";
import BalanceAndRotationForm from "../components/balance-and-rotation-form";
import TireRecyclingForm from "../components/tire-recycling-form";
import StateEnvForm from "../components/state-env-form";
export default function PathRepairTemplate() {
  return (
    <div className="px-6 py-8 gap-5 flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">Service pricing</p>
        <SearchInput />
      </div>
      <Tabs defaultValue="trip-charge">
        <TabsList>
          <TabsTrigger value="trip-charge">Trip Charge</TabsTrigger>
          <TabsTrigger value="install">Install</TabsTrigger>
          <TabsTrigger value="patch-repair">Patch Repair</TabsTrigger>
          <TabsTrigger value="balance-rotation">Balance & Rotation</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="trip-charge" className="mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
            <div className="lg:col-span-4">
              <TripChargeForm />
            </div>
            <div className="lg:col-span-4"></div>
          </div>
        </TabsContent>
        <TabsContent value="install">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
            <div className="lg:col-span-4 space-y-3">
              <InstallBundleForm />
              <InstallOnlyForm />
            </div>
            <div className="lg:col-span-4"></div>
          </div>
        </TabsContent>
        <TabsContent value="patch-repair">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
            <div className="lg:col-span-4">
              <InstallBundleForm />
            </div>
            <div className="lg:col-span-4"></div>
          </div>
        </TabsContent>
        <TabsContent value="balance-rotation">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
            <div className="lg:col-span-4">
              <BalanceAndRotationForm />
            </div>
            <div className="lg:col-span-4"></div>
          </div>
        </TabsContent>
        <TabsContent value="fees">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
            <div className="lg:col-span-4 space-y-3">
              <TireRecyclingForm />
              <StateEnvForm />
            </div>
            <div className="lg:col-span-4"></div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
