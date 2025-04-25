import { anyone } from "@/access/anyone"
import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
    slug: "media",
    access: {
        create: anyone,
        delete: anyone,
        read: anyone,
        update: anyone,
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: true,
        },
    ],
    upload: true,
}