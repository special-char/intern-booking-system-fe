import { type NextRequest, NextResponse } from "next/server"

const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_SECRET

export async function POST(request: NextRequest) {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ success: false, error: "Razorpay credentials not configured" }, { status: 500 })
    }

    const body = await request.json()
    const {
      amount,
      currency = "INR",
      email,
      contact,
      method = "card",
      card_number = "4111111111111111", // Test card
      card_expiry_month = "12",
      card_expiry_year = "25",
      card_cvv = "123",
    } = body

    if (!amount || !email || !contact) {
      return NextResponse.json({ success: false, error: "Amount, email, and contact are required" }, { status: 400 })
    }

    // Create basic auth header
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")

    // First create an order
    const orderData = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `test_receipt_${Date.now()}`,
      notes: {
        test_payment: true,
        created_via: "dashboard",
      },
    }

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
      throw new Error(`Order creation failed: ${errorText}`)
    }

    const order = await orderResponse.json()

    // Create test payment data
    const paymentData = {
      amount: amount * 100,
      currency,
      order_id: order.id,
      email,
      contact,
      method,
      card:
        method === "card"
          ? {
              number: card_number,
              expiry_month: card_expiry_month,
              expiry_year: card_expiry_year,
              cvv: card_cvv,
              name: "Test User",
            }
          : undefined,
    }

    // Note: In test mode, we can't actually create payments directly via API
    // This would normally be done through Razorpay's frontend integration
    // For testing purposes, we'll return the order details

    return NextResponse.json({
      success: true,
      order,
      payment_data: paymentData,
      message:
        "Test order created. In a real scenario, this would be processed through Razorpay's frontend integration.",
      instructions: "Use Razorpay's test card numbers to simulate payments in your frontend integration.",
    })
  } catch (error) {
    console.error("Error creating test payment:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create test payment",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
