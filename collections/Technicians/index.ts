import type { CollectionConfig } from "payload";
import { syncUserFromTechnician } from "./hooks/syncUserFromTechnician";
import { updateTechnicians } from "./hooks/updateTechnician";
import { deleteUserWithTechnician } from "./hooks/deleteUserWithTechnician";
import { syncBeforeUserFromTechnician } from "./hooks/syncBeforeUserFromTechnician";
import { createAccess } from "./acess/create";
import { deleteAccess } from "./acess/delete";
import { updateAccess } from "./acess/update";


export const Technicians: CollectionConfig = {
  slug: 'technicians',
  access: {
    create: createAccess,
    delete: deleteAccess,
    read: createAccess,
    update: updateAccess,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      access: {
        update: () => false,
      },
    },
    {
      name: "password",
      type: "text",
      required: true,
      access: {
        update: () => false,
      },
    },
    {
      name: "mobilePhone",
      type: "number",
      required: true,
    },
    {
      name: "twilioPhone",
      type: "number",
    },
    {
      name: "profilePhoto",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "mobileTireVan",
      label: "Mobile Tire Van",
      type: "relationship",
      relationTo: "vans",
      hasMany: true,
    },
    {
      name: "user",
      label: "User ID",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    beforeChange: [syncBeforeUserFromTechnician],
    afterChange: [syncUserFromTechnician, updateTechnicians],
    beforeDelete: [deleteUserWithTechnician],
  },
};
