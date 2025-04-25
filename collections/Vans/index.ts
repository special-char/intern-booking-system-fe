import { create } from 'domain'
import type { CollectionConfig } from 'payload'
import { createAndUpdateAccess } from './access/createAndUpdate'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'


export const Vans: CollectionConfig = {
    slug: 'vans',
    access: {
        create: createAndUpdateAccess,
        read: ({ req }) => Boolean(req.user),
        update: createAndUpdateAccess,
        delete: isSuperAdminAccess,
    },
    admin: {
        useAsTitle: 'modelTrim',
    },
    fields: [
        {
            name: 'vehicleId',
            label: 'Vehicle ID',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'yearMake',
            label: 'Year & Make',
            type: 'text',
            required: true,
            admin: {
                description: 'Enter the year and make (e.g., 2023 Mercedes Sprinter)',
            },
        },
        {
            name: 'modelTrim',
            label: 'Model / Trim',
            type: 'text',
            required: true,
            admin: {
                description: 'Enter the model and trim (e.g., 3501 LWB Extra high roof)',
            },
        },
        {
            name: 'tireCount',
            label: 'Tire Count',
            type: 'number',
        },
        {
            name: 'technician',
            type: 'join',
            collection: 'technicians',
            on: 'mobileTireVan',
            admin: {
                defaultColumns: ["type", "name", "email", "mobilePhone"]
            }
        }
    ],
}
