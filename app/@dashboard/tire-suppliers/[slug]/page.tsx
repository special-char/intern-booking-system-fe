import { getTireSupplierBySlug } from "@/mocks/tire-suppliers";
import { TireSupplierTemplate } from "@/modules/tire-suppliers/templates/tire-supplier-template";
import { TireSupplier } from "@/types/tire-supplier";
import { Metadata } from "next";

interface TireSuppliersPageProps {
  params: Promise<{
    slug: string;
  }>
}

export async function generateMetadata(props: TireSuppliersPageProps): Promise<Metadata> {
  const { slug } = await props.params;

  return {
    title: `Treadcommand | ${slug}`,
    description: "Treadcommand | Tire Brands",
  }
}

export default async function TireSupplierPage(props: TireSuppliersPageProps) {
  const { slug } = await props.params;
  const supplier: TireSupplier | null = await getTireSupplierBySlug(slug)

  if (!supplier) {
    return <div>No tire supplier found</div>;
  }

  return (
    <TireSupplierTemplate supplier={supplier} />
  );
}
