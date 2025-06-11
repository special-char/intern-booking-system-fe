import { type NextRequest, NextResponse } from "next/server"

const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_SECRET

export async function GET(request: NextRequest) {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: "Razorpay credentials not configured",
        },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)
    const count = searchParams.get("count") || "100"
    const skip = searchParams.get("skip") || "0"

    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")

    const response = await fetch(`https://api.razorpay.com/v1/orders?count=${count}&skip=${skip}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Razorpay Orders API Error:", errorText)
      throw new Error(`Razorpay API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      orders: data.items || [],
      count: data.count || 0,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
