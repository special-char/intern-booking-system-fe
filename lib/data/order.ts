import { sdk } from "../config";
import { mapOrdersToDTO } from "../dto/order";
import { getAuthHeaders } from "./cookies";
import { HttpTypes } from "@medusajs/types";

export async function getOrderList({
  page = 1,
  limit = 10,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: HttpTypes.AdminOrderFilters;
}) {
  const authHeaders = await getAuthHeaders();
  const offset = (page - 1) * limit;

  const queryParams: HttpTypes.AdminOrderFilters = filters
    ? { ...filters, limit, offset }
    : {
        limit,
        offset,
        fields:
          "*customer, shipping_address.first_name, shipping_address.last_name",
        order: "-created_at",
        created_at: {
          $gte: "2025-03-10T00:00:00Z",
        },
      };

  try {
    const orders = await sdk.admin.order.list(queryParams, {
      ...authHeaders,
    });
    return orders;
  } catch (error) {
    console.error(error);
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
    const orders = await getOrderList({ page, limit });

    if (!orders) {
      return null;
    }

    return mapOrdersToDTO(orders);
  } catch (error) {
    console.error(error);
    return null;
  }
}
