import type { Access, ClientUser } from 'payload'


export const isOwnerAccess: Access = ({ req }): boolean => {
    return isOwner(req.user)
}

export const isOwner = (user: ClientUser | null): boolean => {
    return Boolean(user?.roles?.includes('owner'))
}
