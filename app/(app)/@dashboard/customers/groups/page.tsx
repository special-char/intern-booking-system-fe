"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { Button } from "@/components/shadcn/button";
import { Dialog } from "@headlessui/react";
import { Input } from "@/components/shadcn/input";
import { Trash2 } from "lucide-react";

type CustomerGroup = {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
};

type GroupsApiResponse = {
  customer_groups: CustomerGroup[];
};

const fetchGroups = async (): Promise<GroupsApiResponse> => {
  const res = await fetch("/api/customer_group/customer-groups", {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Error response:", text);
    throw new Error("Failed to fetch group data");
  }

  return res.json();
};

export default function GroupsTable() {
  const { data, error, isLoading } = useQuery<GroupsApiResponse>({
    queryKey: ["customer-groups"],
    queryFn: fetchGroups,
  });

  const queryClient = useQueryClient();

  const groups = useMemo(() => {
    return (
      data?.customer_groups?.map((group) => ({
        id: group.id,
        name: group.name,
        created_by: group.created_by,
        created_at: new Date(group.created_at).toLocaleString(),
      })) ?? []
    );
  }, [data]);

  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!groupName) return;

    setLoading(true);
    const res = await fetch("/api/customer_group/add_group", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: groupName,
        metadata: {},
      }),
    });

    setLoading(false);
    if (res.ok) {
      setIsOpen(false);
      setGroupName("");
      queryClient.invalidateQueries({ queryKey: ["customer-groups"] });
    } else {
      const err = await res.json();
      alert(err.error || "Failed to create group");
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this group?");
    if (!confirm) return;

//     await fetch(`/api/customer_group/delete_group/${id}`, {
//   method: "DELETE",
// });

    const res = await fetch(`/api/customer_group/delete_group`, {
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id }),
});


    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Failed to delete");
    } else {
      queryClient.invalidateQueries({ queryKey: ["customer-groups"] });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customer Groups</h1>
        <Button onClick={() => setIsOpen(true)}>+ Create</Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {(error as Error).message}</p>}

      {!isLoading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {/* <TableHead>Created By</TableHead> */}
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                {/* <TableCell>{group.created_by}</TableCell> */}
                <TableCell>{group.created_at}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(group.id)}
                    className="flex gap-1 items-center"
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4">Create Customer Group</Dialog.Title>
            <Input
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
