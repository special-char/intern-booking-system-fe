import { getPayload } from "payload";
import config from "@payload-config";
import { getUser } from "./admin";
import { Tenant } from "@/payload-types";

export type TyreType = "1" | "2" | "3" | "4" | "5" | "6" | "8";

export interface TripCharge {
  price: number;
  territory_id: number;
  isRefundable?: "Yes" | "No";
  tyre_type?: TyreType | null;
  serviceId?: number;
}

export type ServiceType =
  | "Trip Charge"
  | "Install"
  | "Patch Repair"
  | "Balance & Rotation"
  | "Fees"
  | "Tires & Install";

export async function fetchAllTerritories() {
  const payload = await getPayload({ config });

  const { user } = await getUser();
  const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;

  const result = await payload.find({
    collection: "territory",
    where: {
      tenant: {
        equals: tenantId,
      },
    },
  });

  return result;
}

export async function postService(data: TripCharge, service: ServiceType) {
  const payload = await getPayload({ config });

  const { user } = await getUser();
  const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;

  await payload.create({
    collection: "services",
    data: {
      service: service,
      tenant: tenantId,
      ...data,
    },
  });
}

export async function getServices(territoryId: number, service: string) {
  const payload = await getPayload({ config });

  const { user } = await getUser();
  const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;

  const result = await payload.find({
    collection: "services",
    limit: 16,
    where: {
      ...(territoryId !== 0 && {
        territory_id: {
          equals: territoryId,
        },
      }),
      service: {
        equals: service,
      },
      tenant: {
        equals: tenantId,
      },
    },
  });

  return result;
}

export async function updateService(data: TripCharge, service: ServiceType) {
  const payload = await getPayload({ config });

  const { user } = await getUser();
  const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;

  await payload.update({
    collection: "services",
    data,
    limit: 16,
    where: {
      territory_id: {
        equals: data.territory_id,
      },
      id: {
        equals: data.serviceId,
      },
      service: {
        equals: service,
      },
      tenant: {
        equals: tenantId,
      },
    },
  });
}

export async function getStateEnvironments() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "state-environmental",
    limit: 50,
  });

  return result.docs;
}
