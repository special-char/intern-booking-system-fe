import type { Access } from 'payload'
export const anyone: Access = () => true
import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
    return Boolean(user)
}

