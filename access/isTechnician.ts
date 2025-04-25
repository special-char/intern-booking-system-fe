import type { Access } from 'payload'
import { User } from '../payload-types'

export const isTechnicianAccess: Access = ({ req }): boolean => {
  return isTechnician(req.user)
}

export const isTechnician = (user: User | null): boolean => {
  return Boolean(user?.roles?.includes('technician'))
}
