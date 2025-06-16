// // /pages/api/assign-group.ts
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Only POST method allowed" });
//   }

//   const { group_id, customer_id } = req.body;
//   console.log("Request body:", req.body);
//   console.log("Group ID:", group_id);
//   console.log("Customer ID:", customer_id);

//   if (!group_id || !customer_id) {
//     return res.status(400).json({ message: "Missing group_id or customer_id" });
//   }

//   const API_URL = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/customer-groups/${group_id}/customers/batch`;
//   const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MEDUSA_SECRET_API_KEY;

//   if (!ACCESS_TOKEN) {
//     return res.status(500).json({ message: "Missing Medusa secret API key" });
//   }

//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${ACCESS_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ customer_ids: [customer_id] }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return res.status(response.status).json(data);
//     }

//     res.status(200).json(data);
//   } catch (err: any) {
//     res.status(500).json({ message: err.message || "Internal Server Error" });
//   }
// }
// /pages/api/assign-group.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method allowed" });
  }

  const { group_id, customer_id } = req.body;

  if (!group_id || !customer_id) {
    return res.status(400).json({ message: "Missing group_id or customer_id" });
  }

  const API_URL = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/customer-groups/${group_id}/customers`;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MEDUSA_SECRET_API_KEY;

  if (!ACCESS_TOKEN) {
    return res.status(500).json({ message: "Missing Medusa API key" });
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ add: [customer_id] }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ message: err.message || "Internal Server Error" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
