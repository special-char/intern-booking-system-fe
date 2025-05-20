import type { CollectionConfig } from "payload";
import { createAccess } from "../Technicians/acess/create";
import { updateAccess } from "../Technicians/acess/update";
import { deleteAccess } from "../Technicians/acess/delete";

export const Services: CollectionConfig = {
  access: {
    read: () => true,
    create: createAccess,
    update: updateAccess,
    delete: deleteAccess,
  },
  slug: "services",
  fields: [
    {
      name: "tyre_type",
      type: "select",
      options: ["8", "6", "5", "4", "3", "2", "1"],
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "duration",
      type: "text",
    },
    {
      name: "discount",
      type: "number",
    },
    {
      name: "service",
      type: "select",
      options: [
        "Trip Charge",
        "Install",
        "Tires & Install",
        "Patch Repair",
        "Balance & Rotation",
        "Fees",
      ],
      required: true,
    },
    {
      name: "territory_id",
      type: "relationship",
      relationTo: "territory",
      required: true,
    },
    {
      name: "isRefundable",
      type: "radio",
      options: ["Yes", "No"],
    },
  ],
  admin: {
    useAsTitle: "service",
  },
};
