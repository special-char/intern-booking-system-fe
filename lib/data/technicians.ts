"use server";

import { revalidateTag } from "next/cache";
import { getPayloadAuthHeaders } from "./cookies";
import { PostManagerResponse } from "@/types/technicians";
import { getUser } from "./admin";
import { Technician, Tenant } from "@/payload-types";
import { getPayload, PaginatedDocs } from "payload";

import config from "../../payload.config";

export interface GetManagersResponse {
  docs: Technician[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}

export interface CreateManagerInput {
  fullName: string;
  email: string;
  password: string;
  mobilePhone: number;
  twilioPhone: number;
  profilePhoto: File;
  mobileTireVan: number[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const isFile = (value: File): boolean => {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.name === "string" &&
    typeof value.size === "number" &&
    typeof value.type === "string"
  );
};

export async function getManagers({
  page,
  limit,
  where,
}: {
  page?: number;
  limit?: number;
  where?: string;
}): Promise<PaginatedDocs<Technician>> {
  try {
    const payload = await getPayload({ config });
    const { user } = await getUser();
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;

    const query: any = {
      page: page || 1,
      limit: limit || 10,
      where: {
        and: [
          { tenant: { equals: tenantId } },
          where ? {
            or: [
              { name: { contains: where } },
              { email: { contains: where } }
            ]
          } : {}
        ]
      }
    };

    const response = await payload.find({
      collection: "technicians",
      ...query,
    });

    return response as PaginatedDocs<Technician>;
  } catch (error) {
    return {
      docs: [],
      hasNextPage: false,
      hasPrevPage: false,
      limit: limit || 0,
      nextPage: null,
      page: page || 0,
      pagingCounter: 0,
      prevPage: null,
      totalDocs: 0,
      totalPages: 0,
    };
  }
}

async function uploadProfilePhoto(file: File): Promise<number> {
  try {
    const { user } = await getUser();
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;

    const formData = new FormData();
    formData.append(
      "_payload",
      JSON.stringify({
        alt: "manager photo",
        tenant: tenantId,
      })
    );
    formData.append("file", file);

    const response = await fetch(
      `${API_BASE_URL}/api/media?depth=0&fallback-locale=null`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Upload failed: ${errorData?.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.doc.id;
  } catch (error) {
    throw new Error(
      `Failed to upload profile photo: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function createManagerPayload(
  inputData: CreateManagerInput
): Promise<PostManagerResponse> {
  try {
    const profilePhotoId =
      inputData.profilePhoto && isFile(inputData.profilePhoto)
        ? await uploadProfilePhoto(inputData.profilePhoto)
        : null;

    const { user } = await getUser();
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
    const authHeaders = await getPayloadAuthHeaders();

    const response = await fetch(
      `${API_BASE_URL}/api/technicians?depth=0&fallback-locale=null`,
      {
        method: "POST",
        body: JSON.stringify({
          name: inputData.fullName,
          email: inputData.email,
          password: inputData.password,
          tenant: tenantId,
          mobilePhone: inputData.mobilePhone,
          twilioPhone: inputData.twilioPhone,
          profilePhoto: profilePhotoId,
          mobileTireVan: inputData.mobileTireVan.map(Number),
        }),
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create manager: ${errorData?.message || response.statusText}`
      );
    }

    return { isSuccess: true };
  } catch (error) {
    throw new Error(
      `Failed to create manager: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function updateManager(
  inputData: CreateManagerInput,
  id: string
): Promise<PostManagerResponse> {
  try {
    const { user } = await getUser();
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
    const payload = await getPayload({ config });

    const profilePhoto =
      inputData.profilePhoto && isFile(inputData.profilePhoto)
        ? await uploadProfilePhoto(inputData.profilePhoto)
        : typeof inputData.profilePhoto === "number"
          ? inputData.profilePhoto
          : null;

    await payload.update({
      collection: "technicians",
      id,
      data: {
        name: inputData.fullName,
        email: inputData.email,
        password: inputData.password,
        tenant: tenantId,
        mobilePhone: inputData.mobilePhone,
        twilioPhone: inputData.twilioPhone,
        ...(profilePhoto ? { profilePhoto } : {}),
        mobileTireVan: inputData.mobileTireVan,
      },
    });

    return { isSuccess: true };
  } catch (error) {
    throw new Error(
      `Failed to update manager: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function deleteManager(
  id: string
): Promise<{ isSuccess: boolean }> {
  try {
    const authHeaders = await getPayloadAuthHeaders();
    const url = new URL(`${API_BASE_URL}/api/technicians/${id}`);

    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `Error deleting manager: ${data.message || response.statusText}`
      );
    }

    revalidateTag("technicians");
    return { isSuccess: true };
  } catch (error) {
    throw new Error(
      `Failed to delete manager: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export interface Van {
  id: number;
  vehicleId: string;
}

export async function fetchVans(): Promise<Van[]> {
  try {
    const payload = await getPayload({ config });
    const { user } = await getUser();
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;

    const response = await payload.find({
      collection: "mobile-tire-vans",
      where: {
        tenant: { equals: tenantId },
      },
    });

    return response.docs.map((van) => ({
      id: van.id,
      vehicleId: van.vehicleId,
    }));
  } catch (error) {
    return [];
  }
}
