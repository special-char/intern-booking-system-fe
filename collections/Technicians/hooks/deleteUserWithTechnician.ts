import type { CollectionBeforeDeleteHook } from "payload";
import { nylasRequest } from "@/lib/utils/endpoints/nylas";

export const deleteUserWithTechnician: CollectionBeforeDeleteHook = async ({
  id,
  req,
}) => {
  if (!id) {
    throw new Error("Technician ID is required");
  }

  try {
    const technician = await req.payload.findByID({
      collection: "technicians",
      id,
    });

    if (!technician) {
      throw new Error(`Technician with ID ${id} not found`);
    }

    if (technician.grant_id) {
      try {
        await nylasRequest({
          url: `/grants/${technician.grant_id}`,
          method: "DELETE",
        });
      } catch (error) {
        console.error(
          `Failed to delete Nylas grant ${technician.grant_id}:`,
          error
        );
      }
    }

    if (technician.email) {
      try {
        const existingUser = await req.payload.find({
          collection: "users",
          where: { email: { equals: technician.email } },
        });

        const userToDelete = existingUser.docs[0];
        if (userToDelete?.roles?.includes("technician")) {
          await req.payload.delete({
            collection: "users",
            id: userToDelete.id,
          });
        }
      } catch (error) {
        console.error(
          `Failed to delete associated user for email ${technician.email}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error(`Failed to delete technician ${id}:`, error);
    throw error;
  }
};
