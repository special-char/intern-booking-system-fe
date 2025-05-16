import { NextResponse } from "next/server";
import Nylas from "nylas";

const nylasConfig = {
  clientId: process.env.NYLAS_CLIENT_ID,
  callbackUri: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/nylas/oauth/exchange`,
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
};

const nylas = new Nylas({
  apiKey: nylasConfig.apiKey!,
  apiUri: nylasConfig.apiUri,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (path === "auth") {
    const authUrl = nylas.auth.urlForOAuth2({
      clientId: nylasConfig.clientId!,
      redirectUri: nylasConfig.callbackUri,
    });

    console.log("Auth URL:", authUrl);

    return NextResponse.redirect(authUrl);
  }

  return NextResponse.json({ message: "Nylas API is running" });
}
