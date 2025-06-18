import type { CollectionConfig } from "payload";
import { isSuperAdminAccess } from "@/access/isSuperAdmin";
import { anyone } from "@/access/authenticated";

export const Banking: CollectionConfig = {
  slug: "banking",
  access: {
    create: anyone,
    delete: anyone,
    update: anyone,
    read: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: "bankName",
  },
  fields: [
    {
      name: "accountHolderName",
      type: "text",
      required: true,
    },
    {
      name: "bankName",
      type: "text",
      required: true,
    },
    {
      name: "accountNumber",
      type: "text",
      required: true,
    },
    {
      name: "ifscCode",
      type: "text",
      required: true,
    },
    {
      name: "venues",
      type: "relationship",
      relationTo: "venues",
      hasMany: true,
      required: true,
      admin: {
        position: "sidebar",
        description: "Select all venues this bank account is linked to.",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
