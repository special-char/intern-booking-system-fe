import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/authenticated'
// import { createAccess } from './acess/create'
// import { deleteAccess } from './acess/delete'
// import { updateAccess } from './acess/update'

export const Courts: CollectionConfig = {
    slug: 'courts',
    access: {
        create: anyone,
        delete: anyone,
        read: anyone,
        update: anyone,
    },
    fields: [
    ],
}
