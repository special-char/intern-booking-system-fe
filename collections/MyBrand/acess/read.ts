import type { Access } from 'payload'
import type { Mybrand } from '../../../payload-types'
import { isSuperAdmin } from '../../../access/isSuperAdmin'
import { getUserTenantIDs } from '../../../utilities/getUserTenantIDs'
import { isOwner } from '@/access/isOwner'


export const readAccess: Access<Mybrand> = async ({ req }) => {
  // If no user is logged in, deny access
  if (!req.user) {
    return false
  }

  // Super admins can see all brands
  if (isSuperAdmin(req.user) || isOwner(req.user) ) {
    return true
  }

  // Check if user has tenant-admin access to any tenants
  const adminTenantAccessIDs = getUserTenantIDs(req.user, 'tenant-admin')

  if (adminTenantAccessIDs.length) {
    return {
      tenant: {
        in: adminTenantAccessIDs,
      },
    }
  }

  // Deny access for all other roles
  return false
} 