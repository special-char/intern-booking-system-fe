import type { CollectionConfig } from "payload";
import { syncUserFromTechnician } from "./hooks/syncUserFromTechnician";
import { updateTechnicians } from "./hooks/updateTechnician";
import { deleteUserWithTechnician } from "./hooks/deleteUserWithTechnician";
import { createAccess } from "./acess/create";
import { deleteAccess } from "./acess/delete";
import { updateAccess } from "./acess/update";
import { anyone, authenticated } from "@/access/authenticated";

export const Technicians: CollectionConfig = {
  slug: "technicians",
  access: {
    create: anyone,
    delete: anyone,
    read: anyone,
    update: anyone,
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
  ],
  hooks: {
    afterChange: [syncUserFromTechnician, updateTechnicians],
    beforeDelete: [deleteUserWithTechnician],
  },
};
