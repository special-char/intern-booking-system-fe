import SearchInput from "@/components/common/search-input";
import { UserIcon } from "lucide-react";
import { columns } from "../components/van-table/columns";
import { VansTable } from "../components/van-table";
import { AddVan } from "../components/add-van";
import { Pagination } from "@/types/common";
export function VansTemplate() {
  const data = [
    {
      id: "1",
      vehicleId: "VAN-001",
      year: "2023",
      make: "Ford Transit",
      model: "350",
      trim: "Low Roof",
      capacity: "12",
    },
    {
      id: "2",
      vehicleId: "VAN-002",
      year: "2022",
      make: "Ram ProMaster",
      model: "3500",
      trim: "High Roof",
      capacity: "15",
    },
    {
      id: "3",
      vehicleId: "VAN-003",
      year: "2021",
      make: "Mercedes Sprinter",
      model: "316",
      trim: "Cargo",
      capacity: "10",
    },
    {
      id: "4",
      vehicleId: "VAN-004",
      year: "2020",
      make: "Chevrolet Express",
      model: "2500",
      trim: "Extended",
      capacity: "14",
    },
    {
      id: "5",
      vehicleId: "VAN-005",
      year: "2023",
      make: "Nissan NV200",
      model: "Cargo",
      trim: "Standard",
      capacity: "8",
    },
    {
      id: "6",
      vehicleId: "VAN-006",
      year: "2024",
      make: "Volkswagen Crafter",
      model: "L2",
      trim: "High Roof",
      capacity: "16",
    },
    {
      id: "7",
      vehicleId: "VAN-007",
      year: "2022",
      make: "Ford Transit Connect",
      model: "TC",
      trim: "Short Wheelbase",
      capacity: "9",
    },
    {
      id: "8",
      vehicleId: "VAN-008",
      year: "2021",
      make: "Ram ProMaster City",
      model: "M",
      trim: "Standard",
      capacity: "10",
    },
    {
      id: "9",
      vehicleId: "VAN-009",
      year: "2023",
      make: "Mercedes Metris",
      model: "Cargo",
      trim: "Standard",
      capacity: "7",
    },
    {
      id: "10",
      vehicleId: "VAN-010",
      year: "2024",
      make: "Fiat Ducato",
      model: "Evo",
      trim: "Crew Cab",
      capacity: "12",
    },
  ];

  const pagination: Pagination = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: data.length,
  };

  return (
    <div className="py-8 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <UserIcon size={24} />
          <p className="text-lg font-bold">Movile tire vans</p>
        </div>
        <div className="flex gap-5">
          <SearchInput className="min-w-[320px]" />
          <AddVan />
        </div>
      </div>
      <VansTable columns={columns} data={data} pagination={pagination} />
    </div>
  );
}
