import type { CollectionConfig } from 'payload'
import { superAdminOrTenantAdminAccess } from '../Pages/access/superAdminOrTenantAdmin'


export const Vans: CollectionConfig = {
    slug: 'vans',
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
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
