import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const BASE_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MEDUSA_SECRET_API_KEY;

  if (!BASE_URL || !ACCESS_TOKEN) {
    return res.status(500).json({ error: "Missing environment variables" });
  }

  const encodedToken = Buffer.from(ACCESS_TOKEN).toString("base64");

  const headers = {
    Authorization: `Basic ${encodedToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    // Fetch customers
    const customersRes = await fetch(
      `${BASE_URL}/admin/customers?fields=*addresses`,
      { headers }
    );
    const customersData = await customersRes.json();

    // //delete customer
    // const deleteCustomer = async (customerId: string) => {
    //   try {
    //     const deleteRes = await fetch(
    //       `${BASE_URL}/admin/customers/${customerId}`,
    //       {
    //         method: "DELETE",
    //         headers,
    //       }
    //     );

    //     if (!deleteRes.ok) {
    //       const error = await deleteRes.json();
    //       throw new Error(error.message || "Failed to delete customer");
    //     }

    //     const deleteData = await deleteRes.json();
    //     return deleteData;
    //   } catch (err) {
    //     console.error("Delete customer error:", err);
    //     throw err;
    //   }
    // };

    // Fetch customer groups
    const groupsRes = await fetch(`${BASE_URL}/admin/customer-groups`, {
      headers,
    });
    const groupsData = await groupsRes.json();

    // Combine response
    res.status(200).json({
      customers: customersData.customers || [],
      customer_groups: groupsData.customer_groups || [],
    });
  } catch (error: unknown) {
    console.error("API fetch failed:", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
