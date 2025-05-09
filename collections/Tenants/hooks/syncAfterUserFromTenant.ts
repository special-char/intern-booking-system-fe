import { Technician } from "@/payload-types";
import type { CollectionAfterChangeHook } from "payload";

export const syncAfterUserFromTenant: CollectionAfterChangeHook<
  Technician
> = async ({ doc, operation, req }) => {
  if (operation === "create" && doc.email && doc.password) {
    try {
      setTimeout(async () => {
        await req.payload.create({
          collection: "users",
          data: {
            email: doc.email,
            password: doc.password,
            profilePhoto: doc.profilePhoto,
            roles: ["owner"],
            name: doc.name!,
            tenants: [
              {
                tenant: doc.id,
                roles: ["tenant-admin"],
              },
            ],
          },
        });
      }, 100);
      return doc;
    } catch (error) {
      req.payload.logger.error(
        `Error creating user for tenant ${doc.email}: ${error}`
      );
    }
  }
  return doc;
};
