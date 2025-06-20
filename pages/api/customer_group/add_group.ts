import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, metadata } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Missing name" });
  }

  const API_URL = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/customer-groups`;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MEDUSA_SECRET_API_KEY;

  if (!API_URL || !ACCESS_TOKEN) {
    return res.status(500).json({ message: "Missing environment variables" });
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, metadata }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(201).json(data);
  } catch (error: unknown) {
    console.error("Fetch failed:", error);
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
