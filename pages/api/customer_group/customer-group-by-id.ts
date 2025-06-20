import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { customer_id } = req.query;

  if (!customer_id || typeof customer_id !== "string") {
    return res.status(400).json({ error: "Missing or invalid customer_id" });
  }

  try {
    const response = await fetch(
      `https://bookingadmin.thespecialcharacter.com/admin/customer-groups?limit=10&offset=0&fields=%2Bcustomers.id&customers[id]=${customer_id}`,
      {
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_MEDUSA_SECRET_API_KEY || "eyJhY3Rvcl9pZCI6InVzZXJfMDFKVzkwWVpLSzUwQVpYWkhTRVEyVkI2S1EiLCJhY3Rvcl90eXBlIjoidXNlciIsImF1dGhfaWRlbnRpdHlfaWQiOiJhdXRoaWRfMDFKVzkwWVpRUEcwSDBBS0pQWDRYR1BBVlgiLCJhcHBfbWV0YWRhdGEiOnsidXNlcl9pZCI6InVzZXJfMDFKVzkwWVpLSzUwQVpYWkhTRVEyVkI2S1EifSwiaWF0IjoxNzQ5Nzk3MzA2LCJleHAiOjE3NDk4ODM3MDZ9.12okGkmFe4ZKmwOjL5DUdVk4afAAfm8nTsww7j3fWCI"}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const group = data.customer_groups?.[0];
    const name = group?.name || null;

    return res.status(200).json({ name });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", detail: err.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
