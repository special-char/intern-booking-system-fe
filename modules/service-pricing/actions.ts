"use server";

import {
  getServices,
  getStateEnvironments,
  postService,
  ServiceType,
  TyreType,
  updateService,
} from "@/lib/data/service-pricing";

export async function submitService(data: {
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

export async function changeService(data: {
  price: number;
  isRefundable?: "Yes" | "No";
  territory_id: number;
  service: ServiceType;
  tyre_type?: TyreType;
  duration?: number;
  discount?: number;
  serviceId?: number;
}) {
  return await updateService(data, data.service);
}

export async function fetchStateEnvironments() {
  return await getStateEnvironments();
}
