import type { CollectionConfig } from "payload";

import { createAccess } from "./acess/create";
import { deleteAccess } from "./acess/delete";
import { updateAccess } from "./acess/update";
import { readAccess } from "./acess/read";
import { validateUniqueColorRoles } from "./hooks/validateUniqueColorRoles";


export const MyBrand: CollectionConfig = {
  slug: "mybrand",
  access: {
    create: createAccess,
    delete: deleteAccess,
    read: readAccess,
    update: updateAccess,
  },
  // admin: {
  //   useAsTitle: "name",
  // },
  timestamps: true,
  fields: [
   
    {
      name: "user",
      label: "User ID",
      type: "text",
      admin: {
        position: "sidebar",
      },
      access: {
        update: () => false,
      },
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'colorPalette',
      label: 'Color Palette',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      required: true,
      hooks: {
        beforeValidate: [validateUniqueColorRoles],
      },
      fields: [
        {
          name: 'name',
          type: 'select',
          required: true,
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Light 1', value: 'light1' },
            { label: 'Light 2', value: 'light2' },
            { label: 'Dark', value: 'dark' },
          ],
          admin: {
            placeholder: 'Select a color role',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            placeholder: '#HEX or rgba()',
          },
        },
      ],
    },

    // {
    //   name: 'colorPalette',
    //   label: 'Color Palette',
    //   type: 'array',
    //   minRows: 4,
    //   maxRows: 4,
    //   required: true,
    //   fields: [
    //     {
    //       name: 'name',
    //       type: 'text',
    //       required: true,
    //       admin: {
    //         placeholder: 'primary, light1, light2, dark',
    //       },
    //     },
    //     {
    //       name: 'value',
    //       type: 'text',
    //       required: true,
    //       admin: {
    //         placeholder: '#HEX or rgba()',
    //       },
    //     },
    //   ],
    // },
    // {
    //   name: 'fontStyle',
    //   label: 'Font Style',
    //   type: 'text',
    //   required: true,
    //   admin: {
    //     placeholder: 'e.g. Inter, Roboto, etc.',
    //   },
    // },
    {
      name: 'fontStyle',
      label: 'Font Style',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Inter',
          value: 'Inter',
        },
        {
          label: 'Roboto',
          value: 'Roboto',
        },
        {
          label: 'Poppins',
          value: 'Poppins',
        },
        {
          label: 'Lato',
          value: 'Lato',
        },
        {
          label: 'Montserrat',
          value: 'Montserrat',
        },
      ],
      admin: {
        placeholder: 'Select a font style',
      },
       // {
    //   name: "name",
    //   type: "text",
    //   required: true,
    // },
    // {
    //   name: "email",
    //   type: "email",
    //   required: true,
    //   unique: true,
    //   access: {
    //     update: () => false,
    //   },
    // },
    // {
    //   name: "password",
    //   type: "text",
    //   required: true,
    //   access: {
    //     update: () => false,
    //   },
    // },
    // {
    //   name: "mobilePhone",
    //   type: "number",
    //   required: true,
    // },
    // {
    //   name: "twilioPhone",
    //   type: "number",
    // },
    // {
    //   name: "profilePhoto",
    //   type: "upload",
    //   relationTo: "media",
    // },
    // {
    //   name: "mobileTireVan",
    //   label: "Mobile Tire Van",
    //   type: "relationship",
    //   relationTo: "vans",
    //   hasMany: true,
    // },

    },
  ],
};

