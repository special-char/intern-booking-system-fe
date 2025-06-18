import type { CollectionBeforeChangeHook } from "payload";
// import { createCalTeam } from "@/lib/utils/endpoints/cal";
// import { adminApiRequest } from "@/lib/utils/endpoints/api";

export const syncVenueWithMedusaAndCal: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation === "create") {
    try {
      // // Step 1: Fetch owner by ID
      // const owner = await req.payload.findByID({
      //   collection: "tenents",
      //   id: data.owner,
      // });

      // if (!owner) {
      //   throw new Error("Owner not found");
      // }

      // if (!owner.calcomOrgId) {
      //   throw new Error("Owner does not have a Cal.com organization ID");
      // }

      // if (!owner.publishableApiKey) {
      //   throw new Error("Owner does not have a publishable API key");
      // }

      // // Step 2: Create Cal.com team under owner's org
      // const calTeam = await createCalTeam({
      //   teamName: data.name,
      //   orgId: owner.calcomOrgId,
      // });

      // // Step 3: Create Medusa sales channel for this venue
      // const salesChannelResponse = await adminApiRequest({
      //   method: "POST",
      //   url: "/admin/sales-channels",
      //   headers: {
      //     "x-publishable-api-key": owner.publishableApiKey,
      //   },
      //   data: {
      //     name: data.name,
      //     description: `Sales channel for venue: ${data.name}`,
      //     metadata: {
      //       ownerId: data.owner,
      //     },
      //   },
      // });

      // // Step 4: Save returned IDs in venue record
      // data.calcomTeamId = calTeam.id;
      // data.salesChannelId = salesChannelResponse.sales_channel.id;

      // Dummy static data
      data.calcomTeamId = "dummy-calcom-team-id";
      data.salesChannelId = "dummy-sales-channel-id";

    } catch (error) {
      req.payload.logger.error(`syncVenueWithMedusaAndCal error: ${error}`);
    }
  }

  return data;
};
