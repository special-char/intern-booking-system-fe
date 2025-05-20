import { CollectionConfig } from "payload";

export const Configurations: CollectionConfig = {
  slug: "configurations",
  admin: {
    useAsTitle: "configuration_id",
  },
  fields: [
    {
      name: "territory",
      type: "relationship",
      relationTo: "territory",
      required: true,
    },
    {
      name: "configuration_id",
      type: "text",
      required: true,
    }
  ],
};
