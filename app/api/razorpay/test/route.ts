import { NextResponse } from "next/server"

const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_SECRET

export async function GET() {
  try {
    // Test endpoint to verify Razorpay connection
    console.log("Testing Razorpay connection...")

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json({
        success: false,
        error: "Missing credentials",
        details: {
          hasKeyId: !!RAZORPAY_KEY_ID,
          hasKeySecret: !!RAZORPAY_KEY_SECRET,
          keyIdPrefix: RAZORPAY_KEY_ID?.substring(0, 10),
        },
      })
    }

    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")

    // Test with a simple API call to get account details
    const response = await fetch("https://api.razorpay.com/v1/payments?count=1", {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    })

    const responseText = await response.text()

    if (!response.ok) {
      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch {
        errorData = { message: responseText }
      }

      return NextResponse.json({
        success: false,
        status: response.status,
        error: "API call failed",
        details: errorData,
        headers: Object.fromEntries(response.headers.entries()),
      })
    }

    const data = JSON.parse(responseText)

    return NextResponse.json({
      success: true,
      message: "Razorpay connection successful",
      status: response.status,
      paymentCount: data.count || 0,
      hasItems: !!(data.items && data.items.length > 0),
    })
  } catch (error) {
    console.error("Test API error:", error)
    return NextResponse.json({
      success: false,
      error: "Connection test failed",
      message: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
