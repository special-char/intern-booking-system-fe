import { sdk } from "../config";
import { mapOrdersToDTO } from "../dto/order";
import { getAuthHeaders } from "./cookies";

export async function getOrderList({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  const authHeaders = await getAuthHeaders();
  const offset = (page - 1) * limit;

  try {
    const orders = await sdk.admin.order.list(
      {
        limit,
        offset,
      },
      {
        ...authHeaders,
      }
    );
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
