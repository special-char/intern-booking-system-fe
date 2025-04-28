import type { Access, ClientUser } from 'payload'

export const isSuperAdminAccess: Access = ({ req }): boolean => {
  return isSuperAdmin(req.user)
}

export const isSuperAdmin = (user: ClientUser | null): boolean => {
  return Boolean(user?.roles?.includes('super-admin'))
}
