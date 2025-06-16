// pages/api/customer-groups.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const API_URL = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/customer-groups`;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MEDUSA_SECRET_API_KEY;

  if (!API_URL || !ACCESS_TOKEN) {
    return res.status(500).json({ error: "Missing environment variables" });
  }

  try {
    const encodedToken = Buffer.from(ACCESS_TOKEN).toString("base64");

    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Basic ${encodedToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error: unknown) {
    console.error("Fetch failed:", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
