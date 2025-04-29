import { getPayload } from "payload";
import { sdk } from "../config";
import { getUser } from "./admin";
import config from '@payload-config'
import { HttpTypes } from "@medusajs/types";

export async function getOrderList({
  page = 1,
  limit = 10,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: HttpTypes.AdminOrderFilters | any; //TODO: fix type any
}) {
  try {
    const offset = (page - 1) * limit;
    const queryParams: HttpTypes.AdminOrderFilters = filters
      ? { ...filters }
      : ""

    const orders = await sdk.client.fetch(`store/custom`, {
      method: "GET",
      query: queryParams,
    }
    );

    return orders;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getOrderListDTO({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  try {
    const { user } = await getUser();

    console.dir(user, { depth: null });

    const tenant_id = (user?.tenants?.[0]?.tenant as any)?.id
    const user_id = (user?.id)
    const technician_id = await getTechnicianIdByUserId(`${user_id}`);

    const orders = await getOrderList({
      page, limit, filters: {
        ...(technician_id && { technician_id: technician_id }),
        tenant_id: tenant_id,
      }
    });
    if (!orders) {
      return null;
    }
    return orders;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTechnicianIdByUserId(userId: string): Promise<string | number | null> {
  try {
    const payload = await getPayload({ config });

    const data = await payload.find({
      collection: "technicians",
      where: {
        user: {
          equals: userId,
        },
      },
    });

    if (data.docs && data.docs.length > 0) {
      return data.docs[0].id;
    }
    return null;
  } catch (error) {
    console.error("Error fetching technician by user ID:", error);
    return null;
  }
}