"use server";
import { GetTireVansResponse, PostTireVanResponse } from "@/types/tire-vans";
import { revalidateTag } from "next/cache";
import { getUser } from "./admin";
import { Tenant, Van } from "@/payload-types";
import { getPayload } from "payload";
import config from "@payload-config";

export async function getTireVans(
  page: number,
  limit: number,
  search?: string
): Promise<any> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.find({
      collection: "vans",
      ...(search && {
        where: {
          or: [
            {
              vehicleId: {
                contains: search,
              },
            },
            {
              yearAndMake: {
                contains: search,
              },
            },
            {
              modelTrim: {
                contains: search,
              },
            },
          ],
        },
      }),
      limit,
      page,
    });
    return data;
  } catch {
    return { docs: [] };
  }
}

export async function getTireVansDTO({
  page = 1,
  limit = 20,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}): Promise<GetTireVansResponse> {
  try {
    const tireVans = await getTireVans(page, limit, search);
    return {
      docs: tireVans.docs,
      hasNextPage: tireVans.hasNextPage,
      hasPrevPage: tireVans.hasPrevPage,
      limit: tireVans.limit,
      nextPage: tireVans.nextPage,
      page: tireVans.page,
      pagingCounter: tireVans.pagingCounter,
      prevPage: tireVans.prevPage,
      totalDocs: tireVans.totalDocs,
      totalPages: tireVans.totalPages,
    };
  } catch {
    return {
      docs: [],
      hasNextPage: false,
      hasPrevPage: false,
      limit,
      nextPage: null,
      page,
      pagingCounter: 0,
      prevPage: null,
      totalDocs: 0,
      totalPages: 0,
    };
  }
}

export async function createTireVan(
  inputData: Van
): Promise<PostTireVanResponse> {
  try {
    const { user } = await getUser();
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant).id;
    const payload = await getPayload({ config });

    const data = await payload.create({
      collection: "vans",
      data: {
        tenant: tenantId,
        ...inputData,
      },
    });

    if (!data) {
      throw new Error("Failed to create tire van.");
    }

    revalidateTag("tire-vans");

    return {
      isSuccess: true,
      tire_van: data,
    };
  } catch (error) {
    console.error("Error in createTireVan:", error);
    throw error;
  }
}

export async function updateTireVan(
  inputData: Van,
  vanId: string
): Promise<PostTireVanResponse> {
  try {
    const { user } = await getUser();
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant).id;
    const payload = await getPayload({ config });

    const data = await payload.update({
      collection: "vans",
      id: vanId,
      data: {
        tenant: tenantId,
        ...inputData,
      },
    });

    if (!data) {
      throw new Error("Failed to update tire van.");
    }

    revalidateTag("tire-vans");

    return {
      isSuccess: true,
      tire_van: data,
    };
  } catch (error) {
    console.error("Error in updateTireVan:", error);
    throw error;
  }
}

export type DeleteTireVanResponse = {
  isSuccess: boolean;
};

export async function deleteTireVan(id: any): Promise<DeleteTireVanResponse> {
  try {
    const { user } = await getUser();
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant).id;
    const payload = await getPayload({ config });

    await payload.delete({
      collection: "vans",
      id,
      where: {
        tenant: {
          equals: tenantId,
        },
      },
    });

    revalidateTag("tire-vans");

    return {
      isSuccess: true,
    };
  } catch (error) {
    console.error("Error in deleteTireVan:", error);
    throw error;
  }
}
