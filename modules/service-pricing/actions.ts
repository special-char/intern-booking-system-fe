"use server";

import {
  getServices,
  postService,
  ServiceType,
  TyreType,
  updateService,
} from "@/lib/data/service-pricing";

export async function submitTripCharge(data: {
  price: number;
  isRefundable?: "Yes" | "No";
  territory_id: number;
  service: ServiceType;
  tyre_type?: TyreType;
  duration?: number;
  discount?: number;
}) {
  return await postService(data, data.service);
}

export async function getServiceByTerritory(
  territoryId: number,
  service: ServiceType
) {
  return await getServices(territoryId, service);
}

export async function updateTripCharge(data: {
  price: number;
  isRefundable?: "Yes" | "No";
  territory_id: number;
  service: ServiceType;
  tyre_type?: TyreType;
  duration?: number;
  discount?: number;
  serviceId?: number;
}) {
  console.log("data updateTripCharge", data);

  return await updateService(data, data.service);
}
