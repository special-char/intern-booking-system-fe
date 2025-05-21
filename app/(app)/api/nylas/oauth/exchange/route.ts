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
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code returned from Nylas" },
      { status: 400 }
    );
  }

  console.log("Code:", code);

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId!,
      redirectUri: nylasConfig.callbackUri,
      code,
    });

    const { grantId, accessToken } = response;

    console.log("Access Token:", accessToken);
    console.log("Grant ID:", grantId);

    return NextResponse.json({
      message:
        "OAuth2 flow completed successfully for grant ID: " +
        grantId +
        " and access token: " +
        accessToken,
    });
  } catch (error) {
    console.error("OAuth exchange error:", error);
    return NextResponse.json(
      {
        error: "Failed to exchange authorization code for token",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
