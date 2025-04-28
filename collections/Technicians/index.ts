import type { CollectionConfig } from "payload";
import { superAdminOrTenantAdminAccess } from "../Pages/access/superAdminOrTenantAdmin";
import { syncUserFromTechnician } from "./hooks/syncUserFromTechnician";
import { updateTechnicians } from "./hooks/updateTechnician";
import { deleteUserWithTechnician } from "./hooks/deleteUserWithTechnician";
import { syncBeforeUserFromTechnician } from "./hooks/syncBeforeUserFromTechnician";

export const Technicians: CollectionConfig = {
  slug: "technicians",
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: () => true,
    update: superAdminOrTenantAdminAccess,
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
