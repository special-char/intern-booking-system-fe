import { sdk } from "../config";
import { getUser } from "./admin";
import { HttpTypes } from "@medusajs/types";
import { getTechnicianIdByUserId } from "./payload";

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
      : "";

    const orders = await sdk.client.fetch(`store/custom`, {
      method: "GET",
      query: queryParams,
    });

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

    const tenant_id = (user?.tenants?.[0]?.tenant as any)?.id;
    const user_id = user?.id;
    const technician = await getTechnicianIdByUserId(`${user_id}`);

    const orders = await getOrderList({
      page,
      limit,
      filters: {
        ...(technician?.id && { technician_id: technician?.id }),
        tenant_id: tenant_id,
      },
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
