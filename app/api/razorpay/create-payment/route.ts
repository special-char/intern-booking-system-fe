import { type NextRequest, NextResponse } from "next/server"

const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_SECRET

export async function POST(request: NextRequest) {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ success: false, error: "Razorpay credentials not configured" }, { status: 500 })
    }

    const body = await request.json()
    const { amount, currency = "INR", receipt, notes } = body

    if (!amount) {
      return NextResponse.json({ success: false, error: "Amount is required" }, { status: 400 })
    }

    // Create basic auth header
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")

    // Create order first (required for payment)
    const orderData = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    }

    console.log("Creating order with data:", orderData)

    const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text()
      console.error("Order creation failed:", errorText)
      throw new Error(`Order creation failed: ${orderResponse.status}`)
    }

    const order = await orderResponse.json()
    console.log("Order created successfully:", order.id)

    return NextResponse.json({
      success: true,
      order,
      message: "Order created successfully. Use this order_id to create a payment.",
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
