import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/authenticated'
// import { createAccess } from './acess/create'
// import { deleteAccess } from './acess/delete'
// import { updateAccess } from './acess/update'

export const Venues: CollectionConfig = {
    slug: 'venues',
    access: {
        create: anyone,
        delete: anyone,
        read: anyone,
        update: anyone,
    },
    fields: [
    ],
}
