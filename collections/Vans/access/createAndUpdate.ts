import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'
import { Access } from 'payload'

export const createAndUpdateAccess: Access = ({ req }) => {
    if (!req.user) {
        return false
    }

    if (req.user.tenants) {
        return true
    }

    if (isSuperAdmin(req.user)) {
        return true
    }

    return {
        id: {
            in: getUserTenantIDs(req.user, 'tenant-admin'),
        },
    }
}
