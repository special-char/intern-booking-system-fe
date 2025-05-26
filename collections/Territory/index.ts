import type { CollectionConfig } from "payload";
import { createAccess } from "../Technicians/acess/create";
import { updateAccess } from "../Technicians/acess/update";
import { deleteAccess } from "../Technicians/acess/delete";

export const Territory: CollectionConfig = {
  access: {
    read: () => true,
    create: createAccess,
    update: updateAccess,
    delete: deleteAccess,
  },
  slug: "territory",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "polygon",
      type: "array",
      required: true,
      minRows: 3, 
      fields: [
        {
          name: "lat",
          type: "number",
          required: true,
        },
        {
          name: "lng",
          type: "number", 
          required: true,
        }
      ],
    },
    {
      name: "properties",
      type: "json",
    },
    {
      name: "type",
      type: "text",
      defaultValue: "polygon",
    },
  ],
  admin: {
    useAsTitle: "name",
  },
};
