import type { CollectionConfig } from 'payload'
import { isTechnician } from '@/access/isTechnician'
import afterChangeCreateUser from './hooks/afterChangeCreateUser'
import { createAccess } from './acess/create'
import { authenticated } from '@/access/authenticated'
import { deleteAccess } from './acess/delete'
import { updateAccess } from './acess/update'
export const Technicians: CollectionConfig = {
    slug: 'technicians',
    access: {
        create: createAccess,
        delete: deleteAccess,
        read: createAccess,
        update: updateAccess,
    },
    admin: {
        useAsTitle: 'name',
        hidden: ({ user }) => isTechnician(user),
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true,
        },
        {
            name: 'password',
            type: 'text',
            required: true,

        },
        {
            name: 'mobilePhone',
            type: 'number',
            required: true,
        },
        {
            name: 'twilioPhone',
            type: 'number',
        },
        {
            name: 'profilePhoto',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'mobileTireVan',
            label: 'Mobile Tire Van',
            type: 'relationship',
            relationTo: 'vans',
        },

    ],
    hooks: {
        afterChange: [
            afterChangeCreateUser
        ]
    },
}
