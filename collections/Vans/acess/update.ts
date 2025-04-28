import type { Access } from 'payload'

import type { Technician } from '../../../payload-types'

import { isSuperAdmin } from '../../../access/isSuperAdmin'
import { getUserTenantIDs } from '../../../utilities/getUserTenantIDs'
import { isOwner } from '@/access/isOwner'
import { isManager } from '@/access/isManager'

export const updateAccess: Access<Technician> = ({ req }) => {
  if (!req.user) {
    return false
  }

  if (isSuperAdmin(req.user) || isOwner(req.user) || isManager(req.user)) {
    return true
  }

  const adminTenantAccessIDs = getUserTenantIDs(req.user, 'tenant-admin')

  if (adminTenantAccessIDs.length) {
    return true
  }

  return false
}
