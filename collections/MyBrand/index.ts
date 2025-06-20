import type { CollectionConfig } from "payload";

import { createAccess } from "./acess/create";
import { deleteAccess } from "./acess/delete";
import { updateAccess } from "./acess/update";
import { readAccess } from "./acess/read";
import { validateUniqueColorRoles } from "./hooks/validateUniqueColorRoles";
import { deleteMediaWithBrand } from "./hooks/deleteMediaWithBrand";


export const MyBrand: CollectionConfig = {
  slug: "mybrand",
  access: {
    create: createAccess,
    delete: deleteAccess,
    read: readAccess,
    update: updateAccess,
  },
  admin: {
    useAsTitle: 'id',
  },
  timestamps: true,
  fields: [

    // {
    //   name: "user",
    //   label: "User ID",
    //   type: "text",
    //   admin: {
    //     position: "sidebar",
    //   },
    //   access: {
    //     update: () => false,
    //   },
    // },
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
      required: false,
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
        { value: 'inter', label: 'Inter' },
        { value: 'roboto', label: 'Roboto' },
        { value: 'opensans', label: 'Open Sans' },
        { value: 'lato', label: 'Lato' },
        { value: 'poppins', label: 'Poppins' },
        { value: 'montserrat', label: 'Montserrat' },
        { value: 'sourcesans', label: 'Source Sans Pro' },
        { value: 'raleway', label: 'Raleway' },
        { value: 'nunito', label: 'Nunito' },
        { value: 'rubik', label: 'Rubik' },
        { value: 'workSans', label: 'Work Sans' },
        { value: 'quicksand', label: 'Quicksand' },
        { value: 'manrope', label: 'Manrope' },
        { value: 'dmsans', label: 'DM Sans' },
        { value: 'urbanist', label: 'Urbanist' },

        // Serif fonts
        { value: 'playfair', label: 'Playfair Display' },
        { value: 'merriweather', label: 'Merriweather' },
        { value: 'lora', label: 'Lora' },
        { value: 'crimsonPro', label: 'Crimson Pro' },
        { value: 'spectral', label: 'Spectral' },
        { value: 'dmSerif', label: 'DM Serif Display' },
        { value: 'cormorant', label: 'Cormorant' },

        // Display and Decorative fonts
        { value: 'josefinSans', label: 'Josefin Sans' },
        { value: 'comfortaa', label: 'Comfortaa' },
        { value: 'righteous', label: 'Righteous' },
        { value: 'bebasNeue', label: 'Bebas Neue' },
        { value: 'pacifico', label: 'Pacifico' },

        // Monospace fonts
        { value: 'firaCode', label: 'Fira Code' },
        { value: 'jetBrainsMono', label: 'JetBrains Mono' },
        { value: 'robotomono', label: 'Roboto Mono' }
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
    // {
    //   name: 'tenant',
    //   type: 'relationship',
    //   relationTo: 'tenants',
    //   required: true,
    // },
  ],
  hooks: {
    afterDelete: [deleteMediaWithBrand],
  },
};

