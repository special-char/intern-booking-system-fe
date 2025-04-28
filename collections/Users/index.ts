import type { CollectionConfig } from "payload";
import { createAccess } from './access/create'
import { readAccess } from './access/read'
import { updateAndDeleteAccess } from './access/updateAndDelete'
import { externalUsersLogin } from './endpoints/externalUsersLogin'
import { ensureUniqueUsername } from './hooks/ensureUniqueUsername'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { setCookieBasedOnDomain } from './hooks/setCookieBasedOnDomain'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'
import { isTechnician } from '@/access/isTechnician'
import { anyone } from "@/access/authenticated";

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  tenantsCollectionSlug: "tenants",
  arrayFieldAccess: {},
  tenantFieldAccess: {},
  rowFields: [
    {
      name: "roles",
      type: "select",
      defaultValue: ["tenant-viewer"],
      hasMany: true,
      options: ["tenant-admin", "tenant-viewer"],
      required: true,
    },
  ],
});

const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: createAccess,
    delete: updateAndDeleteAccess,
    read: readAccess,
    update: anyone,
  },
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => {
      return isTechnician(user as any)
    },
  },
  auth: true,
  endpoints: [externalUsersLogin],
  fields: [
    {
      admin: {
        position: "sidebar",
      },
      name: 'roles',
      type: 'select',
      defaultValue: ['owner'],
      hasMany: true,
      options: ['super-admin', 'owner', 'manager', 'technician'],
      access: {
        update: ({ req }) => {
          return isSuperAdmin(req.user);
        },
      },
    },
    {
      name: 'name',
      type: 'text',
      index: true,
      required: true,
    },
    {
      name: "profilePhoto",
      type: "upload",
      relationTo: "media",
    },

    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: "sidebar",
      },
    },
  ],
  // The following hook sets a cookie based on the domain a user logs in from.
  // It checks the domain and matches it to a tenant in the system, then sets
  // a 'payload-tenant' cookie for that tenant.

  hooks: {
    afterLogin: [setCookieBasedOnDomain],
    // afterChange: [syncTechnicianFromUser],
  },
};

export default Users;
