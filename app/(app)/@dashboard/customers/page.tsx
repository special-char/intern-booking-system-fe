// "use client";

// import { useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Table, TableProps } from "@/components/shadcn/table";

// const columns = [
//   {
//     Header: "Name",
//     accessor: "first_name",
//   },
//   {
//     Header: "Email",
//     accessor: "email",
//   },
//   {
//     Header: "Group",
//     accessor: "groups.0.name",
//   },
// ] as const;

// // Use env vars safely
// const API_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL + "/admin/customers";
// const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MEDUSA_SECRET_API_KEY;

// const fetchCustomer = async () => {
//   const res = await fetch(API_URL!, {
//     headers: {
//       Authorization: `Basic ${ACCESS_TOKEN}`,
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch customer data");
//   }

//   return res.json();
// };

// const CustomersTable = () => {
//   const { data } = useQuery({
//     queryKey: ["customer"],
//     queryFn: fetchCustomer,
//   });

//   const tableData = useMemo(
//     () =>
//       data
//         ? [
//             {
//               id: data.id,
//               first_name: data.first_name,
//               email: data.email,
//               groups: data.groups || [],
//             },
//           ]
//         : [],
//     [data]
//   );

//   const tableProps: TableProps<typeof columns> = {
//     columns,
//     data: tableData,
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
//       <Table {...tableProps} />
//     </div>
//   );
// };

// export default CustomersTable;

// "use client";

// import { useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Table, TableProps } from "@/components/shadcn/table";

// const columns = [
//   {
//     Header: "Name",
//     accessor: "first_name",
//   },
//   {
//     Header: "Email",
//     accessor: "email",
//   },
//   {
//     Header: "Group",
//     accessor: "groups.0.name",
//   },
// ] as const;

// const API_URL = "https://bookingadmin.thespecialcharacter.com/admin/customers";
// const ACCESS_TOKEN = "sk_41e9756febfac3ae6bb27c00197ab4a004e27d327b578f164002437d91855454";
// // const PUBLISHABLE_API_KEY = "pk_ad4027894335c0a900d65cd978effb5cbea9af06ae05eb41a12ba52a4e025a82";

// const fetchCustomer = async () => {
//   const res = await fetch(API_URL, {
//     headers: {
//       Authorization: `Basic ${ACCESS_TOKEN}`,
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch customer data");
//   }

//   return res.json();
// };

// const CustomersTable = () => {
//   const { data } = useQuery({
//     queryKey: ["customer"],
//     queryFn: fetchCustomer,
//   });

//   const tableData = useMemo(
//     () =>
//       data
//         ? [
//             {
//               id: data.id,
//               first_name: data.first_name,
//               email: data.email,
//               groups: data.groups || [],
//             },
//           ]
//         : [],
//     [data]
//   );

//   const tableProps: TableProps<typeof columns> = {
//     columns,
//     data: tableData,
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
//       <Table {...tableProps} />
//     </div>
//   );
// };

// export default CustomersTable;

// "use client";

// import React, { useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Table, TableProps } from "@/components/shadcn/table";

// // Define columns for the table
// const columns = [
//   {
//     Header: "Name",
//     accessor: "first_name",
//   },
//   {
//     Header: "Email",
//     accessor: "email",
//   },
//   {
//     Header: "Group",
//     accessor: "groups.0.name",
//   },
// ] as const;

// // Your Medusa admin customers API URL and access token
// const API_URL = "https://bookingadmin.thespecialcharacter.com/admin/customers";
// const ACCESS_TOKEN = "sk_41e9756febfac3ae6bb27c00197ab4a004e27d327b578f164002437d91855454";

// // Fetch function to get customers list from the Medusa admin API
// const fetchCustomers = async () => {
//   const res = await fetch(API_URL, {
//     headers: {
//       Authorization: `Basic ${ACCESS_TOKEN}`, // Basic auth (use Bearer if your API requires)
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch customer data");
//   }

//   return res.json();
// };

// interface Customer {
//   id: string;
//   first_name: string;
//   email: string;
//   groups: Array<{ id: string; name: string }>;
// }

// const CustomersTable: React.FC = () => {
//   const { data, error, isLoading } = useQuery<{ customers: Customer[] }>({
//     queryKey: ["customers"],
//     queryFn: fetchCustomers,
//   });

//   // Prepare data for the table - flatten or map as needed
//   const tableData = useMemo(() => {
//     if (!data?.customers) return [];
//     return data.customers.map((cust) => ({
//       id: cust.id,
//       first_name: cust.first_name,
//       email: cust.email,
//       groups: cust.groups || [],
//     }));
//   }, [data]);

//   if (isLoading) return <p>Loading customers...</p>;
//   if (error) return <p>Error loading customers: {(error as Error).message}</p>;

//   const tableProps: TableProps<typeof columns> = {
//     columns,
//     data: tableData,
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
//       <Table {...tableProps} />
//     </div>
//   );
// };

// export default CustomersTable;


"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";

type Customer = {
  id: string;
  first_name: string;
  email: string;
  groups: { name: string }[];
};

type ApiResponse = {
  customers: Customer[];
};

const fetchCustomer = async (): Promise<ApiResponse> => {
  const res = await fetch("/api/customers", {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Error response:", text);
    throw new Error("Failed to fetch customer data");
  }

  return res.json();
};

export default function CustomersTable() {
  const { data, error, isLoading } = useQuery<ApiResponse>({
    queryKey: ["customers"],
    queryFn: fetchCustomer,
  });

  const customers = useMemo(() => {
    return (
      data?.customers?.map((customer) => ({
        id: customer.id,
        first_name: customer.first_name,
        email: customer.email,
        groups: customer.groups || [],
      })) ?? []
    );
  }, [data]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {(error as Error).message}</p>}

      {!isLoading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Group</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.first_name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.groups[0]?.name ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
