import { CollectionConfig } from "payload";


export const Tenants: CollectionConfig = {
    slug: 'tenants',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'domain',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'settings',
            type: 'group',
            fields: [
                {
                    name: 'theme',
                    type: 'select',
                    options: [
                        { label: 'Light', value: 'light' },
                        { label: 'Dark', value: 'dark' },
                    ],
                    defaultValue: 'light',
                },
            ],
        },
    ],
} 