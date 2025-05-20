import { getPayload } from "payload";
import { getUser } from "./admin";
import config from "@payload-config";

export const getConfiguration = async () => {
    const { user } = await getUser();
    const tenant_id = (user?.tenants?.[0]?.tenant as any)?.id;
    try {
        const payload = await getPayload({ config });
        const data = await payload.find({
          collection: "configurations",
          where: {
            tenant: {
                equals: tenant_id
            }
          }
        });
        return data;
      } catch (error) {
        return { docs: [] };
      }
}