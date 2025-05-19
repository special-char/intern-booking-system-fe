import { CollectionConfig } from "payload";

export const Configurations: CollectionConfig = {
  slug: "configurations",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "territory",
      type: "text",
      required: true,
    },
    {
      name: "tire_count",
      type: "number",
      required: true,
      min: 1,
    },
    {
      name: "configuration_id",
      type: "text",
      required: true,
    },
    {
      name: "tenantRelation",
      type: "relationship",
      relationTo: "tenants",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
