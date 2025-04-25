import type { CollectionAfterChangeHook } from 'payload'
import { sdk } from '@/lib/config'
import type { Tenant } from '@/payload-types'

export const afterTenantCreate: CollectionAfterChangeHook<Tenant> = async ({
    doc,
    operation,
    req
}) => {
    if (operation === 'create') {
        try {
            const payload = req.payload

            const [
                { sales_channel },
                { api_key },
                { products }
            ] = await Promise.all([
                sdk.admin.salesChannel.create({
                    name: doc.name,
                    description: `Sales channel for ${doc.name}`,
                    metadata: {
                        tenantId: doc.id,
                        tenantSlug: doc.slug,
                        tenantDomain: doc.domain
                    }
                }),
                sdk.admin.apiKey.create({
                    title: `Publishable API Key - ${doc.name}`,
                    type: 'publishable',
                }),
                sdk.admin.product.list({
                    limit: 2000
                })
            ]);

            const batchSalesChannelPromise = sdk.admin.apiKey.batchSalesChannels(api_key.id, { add: [sales_channel.id] });

            const productIds = products.map(product => product.id);

            let batchProductsPromise
            if (productIds.length > 0) {
                batchProductsPromise = sdk.admin.salesChannel.batchProducts(sales_channel.id, { add: productIds });
            }

            const credentials = payload.update({
                collection: 'tenants',
                id: doc.id,
                data: {
                    salesChannelId: sales_channel.id,
                    publishableApiKey: api_key.token,
                } as any,
                req,
                overrideAccess: true,
                depth: 0,
            })

            await Promise.all([batchSalesChannelPromise, batchProductsPromise, credentials]);



        } catch (error) {
            console.error('Error during tenant creation', error);
        }
    }
} 