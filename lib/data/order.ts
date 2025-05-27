import { sdk } from "../config";
import { getUser } from "./admin";
import { HttpTypes } from "@medusajs/types";
import { getTechnicianByUserId } from "./payload";

export async function getOrderList({
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: HttpTypes.AdminOrderFilters | any; //TODO: fix type any
}) {
  try {
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
  search,
  dateFilter,
}: {
  page?: number;
  limit?: number;
  search?: string;
  dateFilter?: Date | null;
}) {
  try {
    const { user } = await getUser();
    const tenant_id = (user?.tenants?.[0]?.tenant as any)?.id;
    const user_id = user?.id;
    const technician = await getTechnicianByUserId(user_id as number);

    // Prepare date filter if provided
    const dateFilterQuery = dateFilter
      ? {
        created_at: {
          gte: dateFilter.toISOString(),
        },
      }
      : {};

    const orders = await getOrderList({
      page,
      limit,
      filters: {
        ...(technician?.docs?.[0]?.id && { technician_id: technician?.docs?.[0]?.id }),
        ...(tenant_id && { tenant_id: tenant_id }),
        ...(search && search !== "" && { q: search }),
        ...dateFilterQuery,
        offset: (page - 1) * limit,
        limit: limit,
      },
    });

    if (!orders) {
      return { orders: [], count: 0 };
    }

    return {
      orders: (orders as any)?.orders, //TODO: fix type any
      count: (orders as any)?.count,
    };
  } catch (error) {
    console.error(error);
    return { orders: [], count: 0 };
  }
}
