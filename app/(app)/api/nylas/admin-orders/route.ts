// app/api/admin-orders/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL!;
const MEDUSA_ADMIN_API_TOKEN = process.env.MEDUSA_ADMIN_API_TOKEN!;

export async function GET() {
  try {
    const response = await axios.get(`${MEDUSA_BACKEND_URL}/admin/orders`, {
      headers: {
        Authorization: `Basic ${MEDUSA_ADMIN_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json({ orders: response.data.orders });
  } catch (error: any) {
    console.error("Error fetching Medusa orders:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to fetch Medusa orders" }, { status: 500 });
  }
}
