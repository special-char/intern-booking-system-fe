import type { CollectionBeforeDeleteHook } from "payload";

export const deleteUserWithTechnician: CollectionBeforeDeleteHook = async ({
  id,
  req,
}) => {
  try {
    const technician = await req.payload.findByID({
      collection: "technicians",
      id,
    });

    if (technician && technician.email) {
      const existingUser = await req.payload.find({
        collection: "users",
        where: { email: { equals: technician.email } },
      });

      if (
        existingUser.docs.length > 0 &&
        existingUser.docs[0].roles?.includes("technician")
      ) {
        const userId = existingUser.docs[0].id;

        await req.payload.delete({
          collection: "users",
          id: userId,
        });
      }
    }
  } catch (error) {
    console.error(`Error in deleteUserWithTechnician hook:`, error);
  }
};
