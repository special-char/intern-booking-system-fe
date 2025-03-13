import SearchInput from "@/components/common/search-input";
import { UserIcon } from "lucide-react";
import { TechniciansTable } from "../components/technicians-table";
import { columns } from "../components/technicians-table/columns";
import { AddTechnician } from "../components/add-technician";
import { Pagination } from "@/types/common";

export function TechniciansTemplate() {
  const data = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      mobilePhone: "+1234567890",
      twilioPhone: "+1234567891",
      calendarId: "1234567890",
      mobileTireVan: "3501 LWB Extra high roof",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      mobilePhone: "+1987654321",
      twilioPhone: "+1987654322",
      calendarId: "0987654321",
      mobileTireVan: "3502 MWB High roof",
    },
    {
      id: "3",
      name: "Dwayne Johnson",
      email: "dwayne.johnson@example.com",
      mobilePhone: "+1122334455",
      twilioPhone: "+1122334456",
      calendarId: "3344556677",
      mobileTireVan: "3503 SWB Standard roof",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      mobilePhone: "+1555666777",
      twilioPhone: "+1555666778",
      calendarId: "7788990011",
      mobileTireVan: "3504 LWB Extra high roof",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      mobilePhone: "+1777888999",
      twilioPhone: "+1777888990",
      calendarId: "2233445566",
      mobileTireVan: "3505 MWB High roof",
    },
    {
      id: "6",
      name: "Sophia Martinez",
      email: "sophia.martinez@example.com",
      mobilePhone: "+1888999000",
      twilioPhone: "+1888999001",
      calendarId: "5566778899",
      mobileTireVan: "3506 SWB Standard roof",
    },
    {
      id: "7",
      name: "William Anderson",
      email: "william.anderson@example.com",
      mobilePhone: "+1999000111",
      twilioPhone: "+1999000112",
      calendarId: "6677889900",
      mobileTireVan: "3507 LWB Extra high roof",
    },
    {
      id: "8",
      name: "Olivia Thomas",
      email: "olivia.thomas@example.com",
      mobilePhone: "+2111222333",
      twilioPhone: "+2111222334",
      calendarId: "1122334455",
      mobileTireVan: "3508 MWB High roof",
    },
    {
      id: "9",
      name: "James Wilson",
      email: "james.wilson@example.com",
      mobilePhone: "+2222333444",
      twilioPhone: "+2222333445",
      calendarId: "2233445566",
      mobileTireVan: "3509 SWB Standard roof",
    },
    {
      id: "10",
      name: "Isabella Taylor",
      email: "isabella.taylor@example.com",
      mobilePhone: "+2333444555",
      twilioPhone: "+2333444556",
      calendarId: "3344556677",
      mobileTireVan: "3510 LWB Extra high roof",
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
          <p className="text-lg font-bold">Technicians</p>
        </div>
        <div className="flex gap-5">
          <SearchInput className="min-w-[320px]" />
          <AddTechnician />
        </div>
      </div>
      <TechniciansTable columns={columns} data={data} pagination={pagination} />
    </div>
  );
}
