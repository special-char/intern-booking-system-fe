import type { CollectionAfterChangeHook } from "payload";
import type { Tenant } from "@/payload-types";
import { adminApiRequest } from "@/lib/utils/api";

export const afterTenantCreate: CollectionAfterChangeHook<Tenant> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === "create") {
    try {
      const payload = req.payload;
      const [{ sales_channel }, { api_key }, { products }] = await Promise.all([
        adminApiRequest<any>({
          // TODO: fix type any
          method: "POST",
          url: "/admin/sales-channels",
          data: {
            name: doc.name,
            description: `Sales channel for ${doc.name}`,
            metadata: {
              tenantId: doc.id,
              tenantSlug: doc.slug,
              tenantDomain: doc.domain,
            },
          },
        }),
        adminApiRequest<any>({
          method: "POST",
          url: "/admin/api-keys",
          data: {
            title: `Publishable API Key - ${doc.name}`,
            type: "publishable",
          },
        }),
        adminApiRequest<any>({
          method: "GET",
          url: "/admin/products",
          params: {
            limit: 2000,
          },
        }),
      ]);

      const batchSalesChannelPromise = adminApiRequest<any>({
        method: "POST",
        url: `/admin/api-keys/${api_key.id}/sales-channels`,
        data: {
          add: [sales_channel.id],
        },
      });

      const productIds = products?.map((product: any) => product.id);

      let batchProductsPromise;
      if (productIds.length > 0) {
        batchProductsPromise = adminApiRequest<any>({
          method: "POST",
          url: `/admin/sales-channels/${sales_channel.id}/products`,
          data: {
            add: productIds,
          },
        });
      }

      const credentials = payload.update({
        collection: "tenants",
        id: doc.id,
        data: {
          salesChannelId: sales_channel.id,
          publishableApiKey: api_key.token,
        } as any,
        req,
        overrideAccess: true,
        depth: 0,
      });

      await Promise.all([
        batchSalesChannelPromise,
        batchProductsPromise,
        credentials,
      ]);
    } catch (error) {
      console.error("Error during tenant creation", error);
    }
  }
};
