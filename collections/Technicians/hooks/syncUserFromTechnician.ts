import { Technician } from "@/payload-types";
import type { CollectionAfterChangeHook } from "payload";
import { sdk } from "@/lib/config";

export const syncUserFromTechnician: CollectionAfterChangeHook<
  Technician
> = async ({ doc, operation, req }) => {
  const tenantId = (req?.user?.tenants?.[0]?.tenant as any)?.id;

  if (operation === "create" && doc.email && doc.password) {
    try {
      await sdk.client.fetch("store/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          name: doc.name,
          email: doc.email,
          technician_id: doc.id,
          tenant_id: tenantId,
        },
      });
    } catch (error) {
      req.payload.logger.error(
        `Error creating user for technician ${doc.email}: ${error}`
      );
    }
  }

  return doc;
};
