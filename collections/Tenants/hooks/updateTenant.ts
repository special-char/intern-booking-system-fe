import { Tenant } from "@/payload-types";
import type { CollectionAfterChangeHook } from "payload";

export const updateTenant: CollectionAfterChangeHook<Tenant> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === "update" && doc.email) {
    try {
      const existingUser = await req.payload.find({
        collection: "users",
        where: { email: { equals: doc.email } },
      });

      if (existingUser.docs.length > 0) {
        const userId = existingUser.docs[0].id;

        // setImmediate(async () => {
        await req.payload.update({
          collection: "users",
          id: userId,
          data: {
            name: doc.name,
            profilePhoto: doc.profilePhoto,
          },
        });
        // });
      }
    } catch (error) {
      req.payload.logger.error(
        `Error updating user for technician ${doc.email}: ${error}`
      );
    }
  }

  return doc;
};
