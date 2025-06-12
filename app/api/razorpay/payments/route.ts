import { type NextRequest, NextResponse } from "next/server"

const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_SECRET

export async function GET(request: NextRequest) {
  try {
    // Check if credentials are available
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error("Missing Razorpay credentials")
      return NextResponse.json(
        {
          success: false,
          error: "Razorpay credentials not configured",
          message: "Please check your environment variables",
        },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)
    const count = searchParams.get("count") || "100"
    const skip = searchParams.get("skip") || "0"

    console.log("Fetching payments from Razorpay...")
    console.log("Using Key ID:", RAZORPAY_KEY_ID?.substring(0, 10) + "...")

    // Create basic auth header
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")

    const url = `https://api.razorpay.com/v1/payments?count=${count}&skip=${skip}`
    console.log("API URL:", url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Razorpay API Error Response:", errorText)

      // Try to parse error as JSON
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }

      return NextResponse.json(
        {
          success: false,
          error: "Razorpay API error",
          message: errorData.error?.description || errorData.message || `HTTP ${response.status}`,
          details: errorData,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("Successfully fetched payments:", data.count || 0, "items")

    return NextResponse.json({
      success: true,
      payments: data.items || [],
      count: data.count || 0,
    })
  } catch (error) {
    console.error("Error in payments API route:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
