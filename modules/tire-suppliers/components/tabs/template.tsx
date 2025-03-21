import { getTireSuppliers } from "@/mocks/tire-suppliers";
import { TireSuppliersTabs } from ".";
import { TireSupplier } from "@/types/tire-supplier";

export default async function TireSuppliersTabsTemplate() {
  const suppliers: TireSupplier[] | null = await getTireSuppliers()

  if (!suppliers) {
    return <div>No tire suppliers found</div>;
  }

  return <TireSuppliersTabs suppliers={suppliers} active={suppliers[0].slug} />
}