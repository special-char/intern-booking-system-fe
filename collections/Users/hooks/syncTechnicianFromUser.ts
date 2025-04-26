import type { CollectionAfterChangeHook } from "payload";

export const syncTechnicianFromUser: CollectionAfterChangeHook<any> = async ({
  doc,
  operation,
  req,
}) => {
  try {
    if (operation === "update") {
      const existingTechnician = await req.payload.find({
        collection: "technicians",
        where: { email: { equals: doc.email } },
      });

      if (existingTechnician.docs.length > 0) {
        const technicianId = existingTechnician.docs[0].id;
        await req.payload.update({
          collection: "technicians",
          id: technicianId,
          data: {
            name: doc.name,
          },
        });
      }
    }
  } catch (error) {
    req.payload.logger.error(
      `Error updating technician for user ${doc.email}: ${error}`
    );
  }

  return doc;
};
