// pages/api/customer_group/delete_group.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.body;
  const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
  const API_TOKEN = process.env.NEXT_PUBLIC_MEDUSA_SECRET_API_KEY;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid or missing ID" });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/admin/customer-groups/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return res
        .status(response.status)
        .json({ error: error.message || "Failed to delete group" });
    }

    return res.status(200).json({ message: "Group deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
