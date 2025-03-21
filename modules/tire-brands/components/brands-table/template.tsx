import { Pagination } from "@/types/common";
import { TireBrand } from "@/types/tire-brand";
import { TireBrandTable } from ".";
import { getTireSuppliers } from "@/mocks/tire-suppliers";
import { getTireBrands } from "@/mocks/tire-brands";
import { TireSupplier } from "@/types/tire-supplier";


export async function TireBrandTableTemplate() {
  const data: TireBrand[] | null = await getTireBrands();
  const suppliers: TireSupplier[] | null = await getTireSuppliers()

  if (!data || !suppliers) {
    return <div>No tire brands found</div>;
  }

  const pagination: Pagination = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: data.length,
  };

  return (<TireBrandTable data={data} pagination={pagination} suppliers={suppliers} />);
}
