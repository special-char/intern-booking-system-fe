"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface DashboardData {
  medusaOrders: any[];
  medusaTotalRevenue: number;
  medusaTotalBookings: number;
  medusaAverageBookingValue: number;
}

export function useDashboardData() {
  const [medusaOrders, setMedusaOrders] = useState<any[]>([]);
  const [medusaTotalRevenue, setMedusaTotalRevenue] = useState(0);
  const [medusaTotalBookings, setMedusaTotalBookings] = useState(0);
  const [medusaAverageBookingValue, setMedusaAverageBookingValue] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/nylas/admin-orders");
        const medusa_orders = res.data.orders;
        const medusa_orders_count = medusa_orders.length;

        // Calculate medusa total revenue from `paid_total`
        const medusa_total_revenue = medusa_orders.reduce(
          (sum: number, order: any) => {
            return sum + (order.summary.paid_total || 0);
          },
          0
        );

        // Calculate average booking value
        const average_booking_value =
          medusa_total_revenue / medusa_orders_count;

        setMedusaOrders(medusa_orders);
        setMedusaTotalBookings(medusa_orders_count);
        setMedusaTotalRevenue(medusa_total_revenue);
        setMedusaAverageBookingValue(average_booking_value);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  return {
    medusaOrders,
    medusaTotalRevenue,
    medusaTotalBookings,
    medusaAverageBookingValue,
  };
}
