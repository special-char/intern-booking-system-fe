import type { CollectionConfig } from "payload";
import { createAccess } from "../Technicians/acess/create";
import { updateAccess } from "../Technicians/acess/update";
import { deleteAccess } from "../Technicians/acess/delete";

export const StateEnvironmental: CollectionConfig = {
  access: {
    read: () => true,
    create: createAccess,
    update: updateAccess,
    delete: deleteAccess,
  },
  slug: "state-environmental",
  fields: [
    {
      name: "state",
      type: "text",
      required: true,
    },
    {
      name: "fees",
      type: "array",
      fields: [
        {
          name: "fee",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
        },
      ],
    },
  ],
  admin: {
    useAsTitle: "state",
  },
};
