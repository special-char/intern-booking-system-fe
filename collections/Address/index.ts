import type { CollectionConfig } from "payload";
import { anyone } from "@/access/authenticated";

export const Address: CollectionConfig = {
  slug: "address",
  access: {
    create: anyone,
    delete: anyone,
    read: anyone,
    update: anyone,
  },
  fields: [
    {
      name: "address",
      type: "group",
      required: true,
      fields: [
        { name: "street1", label: "Street Address 1", type: "text", required: true },
        { name: "street2", label: "Street Address 2", type: "text" },
        { name: "city", type: "text", required: true },
        { name: "pincode", type: "text", required: true },
        {
          name: "state",
          type: "select",
          required: true,
          options: [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
            "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
            "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
            "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
            "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
            "Ladakh", "Puducherry", "Chandigarh", "Andaman and Nicobar Islands",
            "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep"
          ],
        },
      ],
    },
    {
      name: "contact",
      type: "array",
      required: true,
      minRows: 1,
      fields: [{ name: "phoneNumber", type: "text", required: true }],
    },
    {
      name: "websiteLinks",
      type: "array",
      fields: [{ name: "url", type: "text", required: true }],
    },
  ],
};
