import type { CollectionConfig } from "payload";
import { isSuperAdminAccess } from "@/access/isSuperAdmin";
import { updateAndDeleteAccess } from "../Tenants/access/updateAndDelete";
import { syncVenueWithMedusaAndCal } from "./hooks/syncVenueWithMedusaAndCal";
import { updateVenueOnEdit } from "./hooks/updateVenueOnEdit";
import { anyone } from "@/access/authenticated";

export const Venues: CollectionConfig = {
  slug: "venues",
  access: {
    create: anyone,
    delete: anyone,
    read: anyone,
    update: updateAndDeleteAccess,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "tenant",
      type: "relationship",
      relationTo: "tenants",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "categories",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        "Cricket", "Basketball", "Tennis", "Badminton", "Volleyball", "Futsal",
        "Table Tennis", "Pickleball", "Padel", "Squash", "Racquetball",
        "Netball", "Handball", "Swimming Pool", "Gymnasium"
      ],
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "Address",
      type: "relationship",
      relationTo: "address",
      hasMany: false,
      admin: {
        description: "This displays the associated venue details",
      },
    },
    {
      name: "photos",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "amenities",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { value: "restrooms", label: "Restrooms" },
        { value: "changing-rooms", label: "Changing Rooms" },
        { value: "showers", label: "Showers" },
        { value: "lockers", label: "Lockers" },
        { value: "drinking-water", label: "Drinking Water" },
        { value: "waiting-area", label: "Waiting Area" },
        { value: "first-aid", label: "First Aid Kit" },
        { value: "parking", label: "Parking" },
        { value: "security", label: "Security" },
        { value: "cctv", label: "CCTV Surveillance" },
        { value: "fire-safety", label: "Fire Safety Equipment" },
        { value: "wifi", label: "Free WiFi" },
        { value: "digital-scoreboard", label: "Digital Scoreboard" },
        { value: "mobile-charging", label: "Mobile Charging Station" },
        { value: "seating-area", label: "Spectator Seating" },
        { value: "snack-bar", label: "Snack Bar / Café" },
        { value: "pool", label: "Swimming Pool" },
        { value: "equipment-rental", label: "Equipment Rental" },
        { value: "coaching", label: "Coaching / Training Services" },
        { value: "referee", label: "Referee / Umpire Available" },
        { value: "sports-shop", label: "Pro Shop / Sports Store" },
      ],
    },
    {
      name: "faqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    {
      name: "calcomTeamId",
      type: "text",
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "Auto-generated team ID from Cal.com",
      },
      index: true,
    },
    {
      name: "salesChannelId",
      type: "text",
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "Auto-generated Medusa sales channel ID",
      },
      index: true,
    },
    {
      name: "createdAt",
      type: "date",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
      defaultValue: () => new Date().toISOString(),
    },
  ],
  hooks: {
    beforeChange: [syncVenueWithMedusaAndCal],
    afterChange: [updateVenueOnEdit],
  },
};
