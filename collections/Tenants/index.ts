import type { CollectionConfig } from "payload";
import { isSuperAdminAccess } from "@/access/isSuperAdmin";
import { updateAndDeleteAccess } from "./access/updateAndDelete";
import { updateTenant } from "./hooks/updateTenant";
import { syncMedusaAndNylasConfigurations } from "./hooks/syncMedusaAndNylasConfigurations";
import { syncMedusaWithTenant } from "./hooks/syncTechnicianWithMedusa";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  access: {
    create: isSuperAdminAccess,
    delete: updateAndDeleteAccess,
    read: ({ req }) => Boolean(req.user),
    update: updateAndDeleteAccess,
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
      name: "profilePhoto",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "domain",
      type: "text",
      admin: {
        description: "Used for domain-based tenant handling",
      },
    },
    {
      name: "slug",
      type: "text",
      admin: {
        description: "Used for url paths, example: /tenant-slug/page-slug",
      },
      index: true,
      required: true,
    },
    {
      name: "allowPublicRead",
      type: "checkbox",
      admin: {
        description:
          "If checked, logging in is not required to read. Useful for building public pages.",
        position: "sidebar",
      },
      defaultValue: false,
      index: true,
    },
    {
      name: "salesChannelId",
      type: "text",
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "The Medusa Sales Channel ID associated with this tenant.",
      },
      index: true,
    },
    {
      name: "publishableApiKey",
      type: "text",
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "Publishable API Key associated with this tenant.",
      },
      index: true,
    },
    {
      name: "grant_id",
      type: "text",
      admin: {
        position: "sidebar",
        description: "The Nylas Grant ID associated with this tenant.",
      },
      access: {
        update: () => false,
      },
    }
  ],
  hooks: {
    beforeChange: [syncMedusaAndNylasConfigurations],
    afterChange: [syncMedusaWithTenant, updateTenant],
  },
};
