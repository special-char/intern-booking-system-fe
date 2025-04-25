import { create } from 'domain'
import type { CollectionConfig } from 'payload'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { title } from 'process'


export const Technicians: CollectionConfig = {
    slug: 'technicians',
    access: {
        create: ({ req }) => Boolean(req.user),
        read: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: isSuperAdminAccess,
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
            access: {
                read: ({ req: { user } }: { req: any }) => user?.roles[0] === 'super-admin',
            },
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
