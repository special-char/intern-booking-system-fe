import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const API_URL = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/customers`;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MEDUSA_SECRET_API_KEY;

  if (!API_URL || !ACCESS_TOKEN) {
    return res.status(500).json({ error: "Missing environment variables" });
  }

  try {
    const encodedToken = Buffer.from(ACCESS_TOKEN).toString("base64");
    console.log("Encoded Basic Auth token:", encodedToken);

    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Basic ${encodedToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("API response status:", response.status);
    console.log("API response data:", data);

    res.status(response.status).json(data);
  } catch (error: any) {
    console.error("Fetch failed:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
