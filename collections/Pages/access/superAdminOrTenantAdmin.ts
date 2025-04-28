import { isSuperAdmin } from '@/access/isSuperAdmin'
import { isOwner } from '@/access/isOwner'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'
import { Access } from 'payload'
import { isManager } from '@/access/isManager'

/**
 * Tenant admins and super admins can will be allowed access
 */
export const superAdminOrTenantAdminAccess: Access = ({ req }) => {
  if (!req.user) {
    return false
  }

  if (isSuperAdmin(req.user) || isOwner(req.user) || isManager(req.user)) {
    return true
  }

  return {
    tenant: {
      in: getUserTenantIDs(req.user, 'tenant-admin'),
    },
  }
}
