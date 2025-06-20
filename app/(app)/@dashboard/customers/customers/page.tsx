
"use client";

import { useMemo, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";


type Group = { id: string; name: string };

type Customer = {
  id: string;
  first_name: string;
  email: string;
  phone?: string;
  addresses?: {
    address_name?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    country_code?: string;
  }[];
};

type CustomerResponse = {
  customers: Customer[];
};

type GroupResponse = {
  customer_groups: Group[];
};

const fetchCustomer = async (): Promise<CustomerResponse> => {
  const res = await fetch("/api/customer_api/customers", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch customer data");
  return res.json();
};

const fetchGroups = async (): Promise<GroupResponse> => {
  const res = await fetch("/api/customer_group/customer-groups", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch groups");
  return res.json();
};

const fetchAssignedGroup = async (customerId: string): Promise<string> => {
  const res = await fetch(`/api/customer_group/customer-group-by-id?customer_id=${customerId}`);
  if (!res.ok) return "—";
  const data = await res.json();
  return data.name || "—";
};

export default function CustomersTable() {
  const queryClient = useQueryClient();
  const [selectedGroups, setSelectedGroups] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: customerData, isLoading: customerLoading } = useQuery<CustomerResponse>({
    queryKey: ["customers"],
    queryFn: fetchCustomer,
  });

  const { data: groupData, isLoading: groupLoading } = useQuery<GroupResponse>({
    queryKey: ["customer-groups"],
    queryFn: fetchGroups,
  });

  useEffect(() => {
    const loadAssignedGroups = async () => {
      if (!customerData?.customers) return;
      const updated: Record<string, string> = {};
      await Promise.all(
        customerData.customers.map(async (c) => {
          updated[c.id] = await fetchAssignedGroup(c.id);
        })
      );
      setSelectedGroups(updated);
    };
    loadAssignedGroups();
  }, [customerData]);

  const assignGroupMutation = useMutation({
    mutationFn: async ({ group_id, customer_id }: { group_id: string; customer_id: string }) => {
      const res = await fetch(`/api/customer_group/assign-group`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group_id, customer_id }),
      });
      if (!res.ok) throw new Error("Failed to assign group");
      return res.json();
    },
    onSuccess: (_, { group_id, customer_id }) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      const name = groupData?.customer_groups.find((g) => g.id === group_id)?.name ?? "—";
      setSelectedGroups((prev) => ({ ...prev, [customer_id]: name }));
    },
  });

  const customers = useMemo(() => {
    return (
      customerData?.customers.map((c) => {
        const addr = c.addresses?.[0];
        let address = "—";
        
        if (addr) {
          const addressParts = [
            addr.address_name,
            addr.address_1,
            addr.address_2,
            addr.city,
            addr.postal_code
          ].filter(part => part && part.trim() !== ""); 
          
          address = addressParts.length > 0 ? addressParts.join(", ") : "—";
        }
        
        return {
          ...c,
          phone: c.phone ?? "—",
          address,
        };
      }) ?? []
    );
  }, [customerData]);

  const totalCount = customers.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return customers.slice(start, start + pageSize);
  }, [customers, currentPage]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      {(customerLoading || groupLoading) ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Assigned Group</TableHead>
                <TableHead>Assign Group</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.first_name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.address}</TableCell>
                  <TableCell>{selectedGroups[c.id] || "—"}</TableCell>
                  <TableCell>
                    <select
                      className="border p-1 rounded"
                      value={
                        groupData?.customer_groups.find((g) => g.name === selectedGroups[c.id])
                          ?.id || ""
                      }
                      onChange={(e) => {
                        const gid = e.target.value;
                        if (gid) assignGroupMutation.mutate({ group_id: gid, customer_id: c.id });
                      }}
                    >
                      <option value="">— Select —</option>
                      {groupData?.customer_groups.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4 px-2">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalCount)} of{" "}
              {totalCount}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded text-sm"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded text-sm ${
                    currentPage === i + 1 ? "bg-violet-100 border-violet-500" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}