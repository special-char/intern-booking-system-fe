"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
};

export default function EditSidebar({ isOpen, onClose, customer }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressName, setAddressName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
  if (customer) {
    setName(customer.first_name);
    setEmail(customer.email);
    setPhone(customer.phone || "");

    const addr = customer.addresses?.[0];
    const addressText = addr
      ? `${addr.address_1 || ""}, ${addr.city || ""}, ${addr.postal_code || ""}`
      : "";
    setAddress(addressText);
    setAddressName(addr?.address_name || "");
  }
}, [customer]);


  const handleUpdate = async () => {
  if (!customer) return;

  const res = await fetch(`/api/customer_api/update-customer?id=${customer.id}`, {
    method: "PATCH", // <-- FIXED THIS LINE
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: name,
      email,
      phone,
      address_1: address,
      address_name: addressName,
    }),
  });

  if (res.ok) {
    alert("Customer updated successfully.");
    onClose();
  } else {
    const error = await res.json();
    alert(error.message || "Something went wrong.");
  }
};


  if (!customer) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white p-6 shadow-xl overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Customer</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
  <label className="block text-sm font-medium">Address Name</label>
  <input
    value={addressName}
    onChange={(e) => setAddressName(e.target.value)}
    className="w-full border p-2 rounded mt-1"
  />
</div>


          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded bg-gray-100 text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
