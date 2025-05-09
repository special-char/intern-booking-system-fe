import { Technician } from "@/payload-types";
import type { CollectionBeforeChangeHook } from "payload";

export const syncBeforeUserFromTechnician: CollectionBeforeChangeHook<
  Technician
> = async ({ data, operation, req }) => {
  const tenantId = (req?.user?.tenants?.[0]?.tenant as any)?.id;

  if (operation === "create" && data.email && data.password) {
    try {
      const user = await req.payload.create({
        collection: "users",
        data: {
          email: data.email!,
          password: data.password,
          roles: ["technician"],
          name: data.name!,
          profilePhoto: data.profilePhoto,
          tenants: [
            {
              tenant: tenantId,
              roles: ["tenant-viewer"],
            },
          ],
        },
      });

      data.user = `${user.id}`;
    } catch (error) {
      req.payload.logger.error(
        `Error creating user for technician ${data.email}: ${error}`
      );
    }
  }

  return data;
};
