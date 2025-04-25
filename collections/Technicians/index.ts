
import type { CollectionConfig } from 'payload'
import { superAdminOrTenantAdminAccess } from '../Pages/access/superAdminOrTenantAdmin'


export const Technicians: CollectionConfig = {
    slug: 'technicians',
    access: {
        create: superAdminOrTenantAdminAccess,
        delete: superAdminOrTenantAdminAccess,
        read: () => true,
        update: superAdminOrTenantAdminAccess,
    },
    admin: {
        useAsTitle: 'name',
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
            hasMany: true,
        },

    ],
    hooks: {
        afterChange: [
            async ({ doc, req, operation }) => {
                const tenantId = (req?.user?.tenants?.[0]?.tenant as any).id;
                if (operation === 'create' && doc.email && doc.password) {
                    try {
                        await req.payload.create({
                            collection: 'users',
                            data: {
                                email: doc.email,
                                password: doc.password,
                                roles: ['technician'],
                                name: doc.name,
                                profilePhoto: doc.profilePhoto,
                                tenants: [{
                                    tenant: tenantId,
                                    roles: ['tenant-viewer']
                                }]
                            },
                        })
                    } catch (error) {
                        req.payload.logger.error(
                            `Error creating user for technician ${doc.email}: ${error}`,
                        )
                    }
                }
                return doc
            }

        ]
    },
}
