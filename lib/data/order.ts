import { sdk } from "../config";
import { mapOrdersToDTO } from "../dto/order";
import { getUser } from "./admin";
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
  try {
    // const authHeaders = await getAuthHeaders();

    const offset = (page - 1) * limit;

    const queryParams: HttpTypes.AdminOrderFilters = filters
      ? { ...filters, limit, offset }
      : {
        limit,
        offset,
        fields:
          "*customer, shipping_address.first_name, shipping_address.last_name , *technician",
        order: "-created_at",
        created_at: {
          $gte: "2025-03-10T00:00:00Z",
        },
      };
    const orders = await sdk.admin.order.list(queryParams, {
      // ...authHeaders,

    });

    return orders as any;
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
    const orders = await getOrderList({ page, limit });

    if (!orders) {
      return null;
    }

    const tenant_id = (user?.tenants?.[0]?.tenant as any)?.id
    const user_id = (user?.id)
    const technician_id = await getTechnicianIdByUserId(`${user_id}`);
    const role = user?.roles?.[0]?.toString()
    if (orders.orders.length > 0 && technician_id && role === "technician") {
      const filteredOrders = orders.orders.filter((order: any) => {
        return order.technician && Number(order.technician.technician_id) === Number(technician_id);
      });

      return { orders: filteredOrders };
    } else if (orders.orders.length > 0 && role === "owner") {
      const filteredOrders = orders.orders.filter((order: any) => {
        return order.technician && Number(order.technician.tenant_id) === Number(tenant_id);
      });
      return { orders: filteredOrders };
    }
    // return mapOrdersToDTO(orders);
    return orders;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Fetches the technician ID for a given user ID.
 * @param userId The user ID to search for.
 * @returns The technician ID as a string, or null if not found.
 */
export async function getTechnicianIdByUserId(userId: string): Promise<string | null> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/technicians?where[user][equals]=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch technician: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("🚀 ~ getTechnicianIdByUserId ~ data:", data)
    // Assuming the response structure is { docs: [ { id: ... } ] }
    if (data.docs && data.docs.length > 0) {
      return data.docs[0].id;
    }
    return null;
  } catch (error) {
    console.error("Error fetching technician by user ID:", error);
    return null;
  }
}
