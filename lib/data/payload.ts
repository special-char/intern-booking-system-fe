import { Technician, Tenant } from "@/payload-types";
import config from "@payload-config";
import { getPayload, PaginatedDocs } from "payload";

export async function getTechnicianByUserId(
  userId: number
): Promise<PaginatedDocs<Technician> | null> {
  try {
    const payload = await getPayload({ config });

    const data = await payload.find({
      collection: "technicians",
      where: {
        user: {
          equals: userId,
        },
      },
      depth: 0,
    });

    if (data.docs && data.docs.length > 0) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching technician by user ID:", error);
    return null;
  }
}


export async function getTenantById(
  tenantId: number
): Promise<PaginatedDocs<Tenant> | null> {
  try {
    const payload = await getPayload({ config });

    const tenant = await payload.find({
      collection: "tenants",
      where: {
        id: {
          equals: tenantId,
        },
      },
    });

    return tenant;
  } catch (error) {
    console.error("Error fetching tenant by ID:", error);
    return null
  }
}
