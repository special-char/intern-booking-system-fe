import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { Pages } from "./collections/Pages";
import { Tenants } from "./collections/Tenants";
import Users from "./collections/Users";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import { isSuperAdmin } from "./access/isSuperAdmin";
import type { Config } from "./payload-types";
import { getUserTenantIDs } from "./utilities/getUserTenantIDs";
import { seed } from "./seed";
import { Vans } from "./collections/Vans";
import { Media } from "./collections/Media";
import { Technicians } from "./collections/Technicians";
import { Services } from "./collections/Services";
import { Territory } from "./collections/Territory";
import { Configurations } from "./collections/Configurations";
import { StateEnvironmental } from "./collections/State Environmental";
import { territoryCheckPoint } from "./endpoints/territoryContains";
import { territoryQuery } from "./endpoints/territoryContains";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// eslint-disable-next-line no-restricted-exports
export default buildConfig({
  admin: {
    user: "users",
  },
  collections: [
    Pages,
    Users,
    Tenants,
    Vans,
    Media,
    Technicians,
    Services,
    Territory,
    Configurations,
    StateEnvironmental,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  onInit: async (args) => {
    // if (process.env.SEED_DB) {
    //   await seed(args);
    // }
  },
  editor: lexicalEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "generated-schema.graphql"),
  },
  secret: process.env.PAYLOAD_SECRET as string,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [
    multiTenantPlugin<Config>({
      collections: {
        pages: {},
        technicians: {},
        vans: {},
        media: {},
        services: {},
        territory: {},
        configurations: {},
        "state-environmental": {},
      },
      tenantField: {
        access: {
          read: () => true,
          update: ({ req }) => {
            if (isSuperAdmin(req.user)) {
              return true;
            }
            return getUserTenantIDs(req.user).length > 0;
          },
        },
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
  ],
  endpoints:[
    territoryQuery,
    territoryCheckPoint,
  ]
});
