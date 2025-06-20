// import { NextResponse } from "next/server";
// import Nylas from "nylas";

// const nylasConfig = {
//   clientId: process.env.NYLAS_CLIENT_ID,
//   callbackUri: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/nylas/oauth/exchange`,
//   apiKey: process.env.NYLAS_API_KEY,
//   apiUri: process.env.NYLAS_API_URI,
// };

// const nylas = new Nylas({
//   apiKey: nylasConfig.apiKey!,
//   apiUri: nylasConfig.apiUri,
// });

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const path = searchParams.get("path");

//   if (path === "auth") {
//     const authUrl = nylas.auth.urlForOAuth2({
//       clientId: nylasConfig.clientId!,
//       redirectUri: nylasConfig.callbackUri,
//     });

//     console.log("Auth URL:", authUrl);

//     return NextResponse.redirect(authUrl);
//   }

//   return NextResponse.json({ message: "Nylas API is running" });
// }

// pages/api/get-orders.ts
// http://localhost:3000/api/nylas/get-order
import { NextResponse } from "next/server";
import axios from "axios";

const key_id = process.env.RAZORPAY_ID!;
const key_secret = process.env.RAZORPAY_SECRET;
const auth = Buffer.from(`${key_id}:${key_secret}`).toString("base64");

export async function GET() {
  try {
    const response = await axios.get("https://api.razorpay.com/v1/orders", {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    return NextResponse.json({ items: response.data.items });
  } catch (error: any) {
    console.error("Error fetching orders:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

