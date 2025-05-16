import { Tenant } from "@/payload-types";
import type { CollectionAfterChangeHook } from "payload";
import { adminApiRequest } from "@/lib/utils/endpoints/api";

export const syncMedusaWithTenant: CollectionAfterChangeHook<Tenant> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === "create" && doc.email) {
    try {
      await adminApiRequest({
        method: "POST",
        url: "/admin/tenant",
        data: {
          name: doc.name,
          email: doc.email,
          payload_tenant_id: doc.id,
          sales_channel_id: doc.salesChannelId,
          nylas_grant_id: doc.grant_id,
        },
      });
    } catch (error) {
      req.payload.logger.error(
        `Error creating tenant in Medusa for ${doc.email}: ${error}`
      );
    }
  }

  return doc;
};
