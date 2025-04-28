import type { Access, ClientUser } from 'payload'

export const isTechnicianAccess: Access = ({ req }): boolean => {
    return isTechnician(req.user)
}

export const isTechnician = (user: ClientUser | null): boolean => {
    return Boolean(user?.roles?.includes('technician'))
}
