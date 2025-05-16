import { nylasRequest } from "@/lib/utils/endpoints/nylas";
import { Technician } from "@/payload-types";
import type { CollectionBeforeChangeHook } from "payload";

export const syncUserAndNylasCalendar: CollectionBeforeChangeHook<
  Technician
> = async ({ data, operation, req }) => {
  const tenantId = (req?.user?.tenants?.[0]?.tenant as any)?.id;

  if (operation === "create" && data.email && data.password) {
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
        throw new Error(`Nylas API error`);
      }

      const grantId = grantResponse.data.id;

      const calendarResponse = await nylasRequest({
        url: `/grants/${grantId}/calendars`,
        method: "POST",
        data: {
          name: data.name,
          description: `Calendar for ${data.name}`,
        },
      });

      if (!calendarResponse) {
        throw new Error(`Failed to create calendar`);
      }
      const calendarId = calendarResponse.data.id;

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

      data.grant_id = grantId;
      data.calendar_id = calendarId;
      data.user = `${user.id}`;
    } catch (error) {
      req.payload.logger.error(
        `Error in technician creation process for ${data.email}: ${error}`
      );
    }
  }
  return data;
};
