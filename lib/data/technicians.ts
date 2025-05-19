"use server";

import { revalidateTag } from "next/cache";
import { getPayloadAuthHeaders } from "./cookies";
import {

  PostTechnicianResponse,
} from "@/types/technicians";
import { getUser } from "./admin";
import { Tenant } from "@/payload-types";
import { getPayload } from "payload";

import config from '../../payload.config'

// Types
export interface Technician {
  id: number;
  tenant: number;
  name: string;
  email: string;
  password: string;
  mobilePhone: number;
  twilioPhone: number;
  profilePhoto: ProfilePhoto | null;
  mobileTireVan: MobileTireVan[];
  updatedAt: string;
  createdAt: string;
}

interface ProfilePhoto {
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
}

interface MobileTireVan {
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
}

export interface GetTechniciansResponse {
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

export interface CreateTechnicianInput {
  fullName: string;
  email: string;
  password: string;
  mobilePhone: number;
  twilioPhone: number;
  profilePhoto: File;
  mobileTireVan: number[];
}

// Constants
const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

// Helper functions
const isFile = (value: File): boolean => {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.name === 'string' &&
    typeof value.size === 'number' &&
    typeof value.type === 'string'
  );
};


// API functions
export async function getTechnicians({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  // searchQuery,
}: {
  page?: number;
  limit?: number;
  where?: Record<string, any>;
}): Promise<GetTechniciansResponse> {
  try {
    const endpointUrl = new URL(`${API_BASE_URL}/api/technicians?page=${page}&limit=${limit}`);
    // if (searchQuery) {
      
    // }
    const authHeaders = await getPayloadAuthHeaders();

    const response = await fetch(endpointUrl.toString(), {
      method: "GET",
      next: { tags: ["technicians"] },
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error fetching technicians: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // Add default return to satisfy TypeScript
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

async function uploadProfilePhoto(file: File): Promise<number> {
  try {
    const { user } = await getUser();
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;

    const formData = new FormData();
    formData.append("_payload", JSON.stringify({
      alt: "technician photo",
      tenant: tenantId
    }));
    formData.append("file", file);

    const response = await fetch(
      `${API_BASE_URL}/api/media?depth=0&fallback-locale=null`,
      {
        method: "POST",
        body: formData,
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Upload failed: ${errorData?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.doc.id;
  } catch (error) {
    throw error;
  }
}

export async function createTechnicianPayload(
  inputData: CreateTechnicianInput
): Promise<PostTechnicianResponse> {
  try {
    const profilePhotoId = inputData.profilePhoto && isFile(inputData.profilePhoto)
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
          mobileTireVan: inputData.mobileTireVan.map(Number)
        }),
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create technician: ${errorData?.message || response.statusText}`);
    }

    return { isSuccess: true };
  } catch (error) {
    throw new Error(`Failed to create technician: ${error}`);
  }
}

export async function updateTechnician(
  inputData: CreateTechnicianInput,
  id: string
): Promise<PostTechnicianResponse> {
  try {
    const { user } = await getUser();
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
    const payload = await getPayload({ config });

    const profilePhoto = inputData.profilePhoto && isFile(inputData.profilePhoto)
      ? await uploadProfilePhoto(inputData.profilePhoto)
      : typeof inputData.profilePhoto === 'number' ? inputData.profilePhoto : null;

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
        mobileTireVan: inputData.mobileTireVan
      }
    });

    return { isSuccess: true };
  } catch (error) {
    throw new Error(`Failed to update technician: ${error}`);
  }
}

export async function deleteTechnician(id: string): Promise<{ isSuccess: boolean }> {
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
      throw new Error(`Error deleting technician: ${data.message || response.statusText}`);
    }

    revalidateTag("technicians");
    return { isSuccess: true };
  } catch (error) {
    throw new Error(`Failed to delete technician: ${error}`);
  }
}

export interface Van {
  id: number;
  vehicleId: string;
}

export async function fetchVans(): Promise<Van[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vans`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.docs || [];
  } catch (error) {
    throw new Error(`Failed to fetch vans: ${error}`);
  }
}