import { Technician } from "@/payload-types";
import type { CollectionAfterChangeHook } from "payload";
import { adminApiRequest } from "@/lib/utils/api";

export const syncUserFromTechnician: CollectionAfterChangeHook<
  Technician
> = async ({ doc, operation, req }) => {
  const tenantId = (req?.user?.tenants?.[0]?.tenant as any)?.id;

  if (operation === "create" && doc.email && doc.password) {
    try {
      await adminApiRequest<any>({
        method: "POST",
        url: "/store/custom",
        data: {
          name: doc.name,
          email: doc.email,
          technician_id: doc.id,
          tenant_id: tenantId,
        },
      });
    } catch (error) {
      req.payload.logger.error(
        `Error attching technician_id and tenant_id for ${doc.email}: ${error}`
      );
    }
  }

  return doc;
};
