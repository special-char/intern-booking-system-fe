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
    },
  ],
  admin: {
    useAsTitle: "name",
  },
};
