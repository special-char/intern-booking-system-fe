import type { CollectionBeforeChangeHook } from "payload";
import type { Tenant } from "@/payload-types";
import { adminApiRequest } from "@/lib/utils/endpoints/api";
import { nylasRequest } from "@/lib/utils/endpoints/nylas";

export const syncMedusaAndNylasConfigurations: CollectionBeforeChangeHook<
  Tenant
> = async ({ data, operation }) => {
  if (operation === "create") {
    try {
      const grantResponse = await nylasRequest({
        url: `/connect/custom`,
        method: "POST",
        data: {
          provider: "virtual-calendar",
          settings: {
            email: data.email,
          },
          state: `${data.name}`,
        },
      });

      if (!grantResponse) {
        throw new Error(`Error creating Nylas Grant`);
      }

      const grantId = grantResponse.data.id;

      const [{ sales_channel }, { api_key }, { products }] = await Promise.all([
        adminApiRequest({
          method: "POST",
          url: "/admin/sales-channels",
          data: {
            name: data.name,
            description: `Sales channel for ${data.name}`,
            metadata: {
              tenantSlug: data.slug,
              tenantDomain: data.domain,
            },
          },
        }),
        adminApiRequest({
          method: "POST",
          url: "/admin/api-keys",
          data: {
            title: `Publishable API Key - ${data.name}`,
            type: "publishable",
          },
        }),
        adminApiRequest({
          method: "GET",
          url: "/admin/products",
          params: {
            limit: 2000,
          },
        }),
      ]);

      const batchSalesChannelPromise = adminApiRequest({
        method: "POST",
        url: `/admin/api-keys/${api_key.id}/sales-channels`,
        data: {
          add: [sales_channel.id],
        },
      });

      const productIds = products?.map((product: any) => product.id);

      let batchProductsPromise;
      if (productIds.length > 0) {
        batchProductsPromise = adminApiRequest({
          method: "POST",
          url: `/admin/sales-channels/${sales_channel.id}/products`,
          data: {
            add: productIds,
          },
        });
      }

      await Promise.all([batchSalesChannelPromise, batchProductsPromise]);

      data.salesChannelId = sales_channel.id;
      data.publishableApiKey = api_key.token;
      data.grant_id = grantId;
    } catch (error) {
      console.error("Error during tenant creation", error);
    }
  }
};
