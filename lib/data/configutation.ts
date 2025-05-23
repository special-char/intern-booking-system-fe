import { getPayload } from "payload";
import { getUser } from "./admin";
import config from "@payload-config";
import { Configuration, Tenant, Territory } from "@/payload-types";

export const getConfiguration = async (): Promise<Configuration[]> => {
  const { user } = await getUser();
  const tenant_id = (user?.tenants?.[0]?.tenant as Tenant)?.id;
  try {
    const payload = await getPayload({ config });
    const data = await payload.find({
      collection: "configurations",
      where: {
        tenant: {
          equals: tenant_id,
        },
      },
    });
    return data.docs;
  } catch (error) {
    throw new Error("Failed to get configuration", { cause: error });
  }
};

export const getTerritories = async (): Promise<Territory[]> => {
  const payload = await getPayload({ config });
  const { user } = await getUser();
  const tenant_id = (user?.tenants?.[0]?.tenant as Tenant)?.id;
  const result = await payload.find({
    collection: "territory",
    where: {
      tenant: {
        equals: tenant_id,
      },
    },
  });
  return result.docs;
};
