import { FilterGroup } from "@/components/common/table/filter-options-button";

export const filters: FilterGroup[] = [
  {
    id: "payment",
    label: "Payment",
    options: [
      { label: "Paid", value: "Paid" },
      { label: "Not Paid", value: "Not Paid" },
    ],
  },
  {
    id: "orderStatus",
    label: "Order Status",
    options: [
      { label: "Delivered", value: "Delivered" },
      { label: "Pending", value: "Pending" },
      { label: "Shipped", value: "Shipped" },
      { label: "Cancelled", value: "Cancelled" },
    ],
  },
  {
    id: "qboStatus",
    label: "QBO Status",
    options: [
      { label: "Synced", value: "Synced" },
      { label: "Pending", value: "Pending" },
      { label: "Failed", value: "Failed" },
    ],
  },
];
