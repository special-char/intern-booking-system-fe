import type { CollectionAfterChangeHook } from "payload";
// import { updateCalTeam } from "../../../utils/endpoints/cal";
// import { adminApiRequest } from "../../../utils/endpoints/api";

export const updateVenueOnEdit: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== "update") return doc;

  try {
    const { name, calcomTeamId, salesChannelId } = doc;

    // // 1. Update Cal.com team name (if calcomTeamId exists)
    // if (calcomTeamId) {
    //   await updateCalTeam({
    //     teamId: calcomTeamId,
    //     teamName: name,
    //   });
    // }

    // // 2. Update Medusa sales channel name/description (if salesChannelId exists)
    // if (salesChannelId) {
    //   await adminApiRequest({
    //     method: "POST",
    //     url: `/admin/sales-channels/${salesChannelId}`,
    //     data: {
    //       name,
    //       description: `Updated venue: ${name}`,
    //     },
    //   });
    // }

    // Dummy static logic
    if (calcomTeamId) {
      req.payload.logger.info(
        `Simulated update to Cal.com team '${calcomTeamId}' with name '${name}'`
      );
    }

    if (salesChannelId) {
      req.payload.logger.info(
        `Simulated update to Medusa sales channel '${salesChannelId}' with name '${name}'`
      );
    }

  } catch (error) {
    req.payload.logger.error(
      `Error syncing venue updates to Cal.com/Medusa: ${error}`
    );
  }

  return doc;
};
