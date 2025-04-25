import { TireBrandsTemplate } from "@/modules/tire-brands/templates/tire-brands-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Tire Brands",
  description: "Treadcommand | Tire Brands",
};

export default function TireBrandsPage() {
  return (
    <TireBrandsTemplate />
  );
}