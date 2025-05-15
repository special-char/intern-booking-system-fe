import { Technician, Tenant } from "@/payload-types";
import type { CollectionAfterChangeHook } from "payload";
import { adminApiRequest } from "@/lib/utils/endpoints/api";

export const syncMedusaWithTechnician: CollectionAfterChangeHook<
  Technician
> = async ({ doc, operation, req }) => {
  const tenant = req?.user?.tenants?.[0]?.tenant as Tenant;

  if (operation === "create" && doc.email && doc.password) {
    try {
      await adminApiRequest({
        method: "POST",
        url: "/admin/technician",
        data: {
          name: doc.name,
          email: doc.email,
          payload_technician_id: doc.id,
          payload_tenant_id: tenant?.id,
          nylas_grant_id: doc.grant_id,
          nylas_calendar_id: doc.calendar_id,
        },
      });
    } catch (error) {
      req.payload.logger.error(
        `Error syncing technician with Medusa for ${doc.email}: ${error}`
      );
    }
  }

  return doc;
};
