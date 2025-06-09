import type { Access } from 'payload'
import type { Mybrand } from '../../../payload-types'
import { isSuperAdmin } from '../../../access/isSuperAdmin'
import { isOwner } from '@/access/isOwner'

export const readAccess: Access<Mybrand> = async ({ req }) => {
  // If no user is logged in, deny access
  if (!req.user) {
    return false
  }

  // Super admins can see all brands
  if (isSuperAdmin(req.user)) {
    return true
  }

  // Owners can only see their own brand
  if (isOwner(req.user)) {
    return {
      user: {
        equals: req.user.id,
      },
    }
  }

  // Deny access for all other roles
  return false
} 