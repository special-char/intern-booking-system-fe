"use server";

import { revalidateTag } from "next/cache";
import { getAuthHeaders } from "./cookies";
import {

  PostTechnicianResponse,
} from "@/types/technicians";
import { getUser } from "./admin";
import { Tenant } from "@/payload-types";

export interface GetTechniciansResponse {
  docs: Array<{
    id: number;
    tenant: number;
    name: string;
    email: string;
    password: string;
    mobilePhone: number;
    twilioPhone: number;
    profilePhoto: {
      id: number;
      tenant: number;
      alt: string;
      updatedAt: string;
      createdAt: string;
      url: string;
      thumbnailURL: string | null;
      filename: string;
      mimeType: string;
      filesize: number;
      width: number;
      height: number;
      focalX: number;
      focalY: number;
    } | null;
    mobileTireVan: Array<{
      id: number;
      tenant: number;
      vehicleId: string;
      yearMake: string;
      modelTrim: string;
      tireCount: number;
      technician: {
        docs: number[];
        hasNextPage: boolean;
      };
      updatedAt: string;
      createdAt: string;
    }>;
    updatedAt: string;
    createdAt: string;
  }>;
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

export async function getTechnicians({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<GetTechniciansResponse> {
  try {
    const endpointUrl = new URL(
      `http://localhost:3000/api/technicians`
    );

    // Add pagination parameters
    // endpointUrl.searchParams.append("page", page.toString());
    // endpointUrl.searchParams.append("limit", limit.toString());

    const response = await fetch(endpointUrl.toString(), {
      method: "GET",
      next: {
        tags: ["technicians"],
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching technicians: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error in getTechnicians: ", error);
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
      totalPages: 0
    };
  }
}

export async function getTechniciansDTO({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<GetTechniciansResponse> {
  const technicians = await getTechnicians({ page, limit });
  return technicians;
}

export interface CreateTechnicianInput {
  fullName: string;
  email: string;
  password: string;
  mobilePhone: number;
  twilioPhone: number;
  profilePhoto: File;
  mobileTireVan: number[];
}

export async function createTechnician(
  inputData: CreateTechnicianInput
): Promise<PostTechnicianResponse> {
  try {
    const authHeaders = await getAuthHeaders();

    const url = new URL(`${process.env.MEDUSA_BACKEND_URL}/admin/technicians`);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({
        ...inputData,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error creating technician: ${data.message || response.statusText}`
      );
    }

    if (!data || !data.technician) {
      throw new Error("Failed to find created technician.");
    }

    revalidateTag("technicians");

    return {
      isSuccess: true,
      technician: data.technician,
    };
  } catch (error) {
    console.error("Error in createTechnician:", error);
    throw error;
  }
}

export async function updateTechnician(
  inputData: CreateTechnicianInput,
  id: string
): Promise<PostTechnicianResponse> {
  try {

    const { user } = await getUser()
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id
    const formData = new FormData();
    formData.append("_payload", JSON.stringify({
      name: inputData.fullName,
      email: inputData.email,
      password: inputData.password,
      tenant: tenantId,
      mobilePhone: inputData.mobilePhone,
      twilioPhone: inputData.twilioPhone,
      profilePhoto: isFile(inputData.profilePhoto)
        ? await uploadProfilePhoto(inputData.profilePhoto)
        : inputData.profilePhoto,
      mobileTireVan: inputData.mobileTireVan.map(Number)
    }));

    const response = await fetch(
      `http://localhost:3000/api/technicians/${id}?depth=0&fallback-locale=null`,
      {
        method: "PATCH",
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update technician: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      isSuccess: true,
      technician: data.doc
    };
  } catch (error) {
    console.error("Error in updateTechnician:", error);
    throw error;
  }
}

export type DeleteTechnicianResponse = {
  isSuccess: boolean;
};

export async function deleteTechnician(
  id: string
): Promise<DeleteTechnicianResponse> {
  try {
    const authHeaders = await getAuthHeaders();

    const url = new URL(
      `${process.env.MEDUSA_BACKEND_URL}/admin/technicians/${id}`
    );

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
        `Error deleting technician: ${data.message || response.statusText}`
      );
    }

    revalidateTag("technicians");

    return {
      isSuccess: true,
    };
  } catch (error) {
    console.error("Error in deleteTechnician:", error);
    throw error;
  }
}

export interface Van {
  id: number;
  vehicleId: string;
}

export async function fetchVans(): Promise<Van[]> {
  try {
    const res = await fetch("http://localhost:3000/api/vans");

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    return data?.docs || [];
  } catch (error) {
    console.error("Failed to fetch vans:", error);
    return [];
  }
}

// First, helper for media upload
async function uploadProfilePhoto(file: File): Promise<number> {
  try {
    const formData = new FormData();
    const { user } = await getUser()
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id
    // Important: order matters here - _payload must be first
    formData.append("_payload", JSON.stringify({
      alt: "technician photo",
      tenant: tenantId
    }));
    formData.append("file", file);

    const response = await fetch("http://localhost:3000/api/media?depth=0&fallback-locale=null", {
      method: "POST",

      body: formData,
      credentials: 'include', // Important: include cookies in the request
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Upload failed: ${errorData?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.doc.id;
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    throw error;
  }
}

// Add this type check helper at the top of the file
function isFile(value: File): boolean {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.name === 'string' &&
    typeof value.size === 'number' &&
    typeof value.type === 'string'
  );
}

export async function createTechnicianPayload(
  inputData: CreateTechnicianInput
): Promise<PostTechnicianResponse> {
  try {
    // 1. Upload profile photo first
    let profilePhotoId = null;
    if (inputData.profilePhoto && isFile(inputData.profilePhoto)) {
      profilePhotoId = await uploadProfilePhoto(inputData.profilePhoto);
    }
    const { user } = await getUser()
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id

    const formData = new FormData();
    formData.append("_payload", JSON.stringify({
      name: inputData.fullName,
      email: inputData.email,
      password: inputData.password,
      tenant: Number(tenantId),
      mobilePhone: inputData.mobilePhone,
      twilioPhone: inputData.twilioPhone,
      profilePhoto: profilePhotoId,
      mobileTireVan: inputData.mobileTireVan.map(Number)
    }));


    const response = await fetch(
      "http://localhost:3000/api/technicians?depth=0&fallback-locale=null",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create technician: ${errorData?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      isSuccess: true,
      technician: data.doc
    };
  } catch (error) {
    throw error;
  }
}