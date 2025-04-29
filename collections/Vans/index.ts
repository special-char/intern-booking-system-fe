import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access/authenticated'
import { createAccess } from './acess/create'
import { deleteAccess } from './acess/delete'
import { updateAccess } from './acess/update'

export const Vans: CollectionConfig = {
    slug: 'vans',
    access: {
        create: createAccess,
        delete: deleteAccess,
        read: anyone,
        update: updateAccess,
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
            name: 'yearAndMake',
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
            name: 'tireCapacity',
            label: 'Tire Capacity',
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
