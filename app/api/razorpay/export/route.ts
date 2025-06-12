import { type NextRequest, NextResponse } from "next/server"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export async function POST(request: NextRequest) {
  try {
    const { payments } = await request.json()

    if (!payments || !Array.isArray(payments)) {
      return NextResponse.json({ error: "Invalid payments data" }, { status: 400 })
    }

    // Create PDF
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(16)
    doc.text("Razorpay Payment Transactions", 14, 16)

    // Add generation date
    doc.setFontSize(10)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 24)

    // Prepare table data
    const headers = ["Payment ID", "Email", "Amount (₹)", "Status", "Method", "Date", "Order ID"]

    const data = payments.map((payment: any) => [
      payment.id,
      payment.email || "N/A",
      `₹${(payment.amount / 100).toFixed(2)}`,
      payment.status.charAt(0).toUpperCase() + payment.status.slice(1),
      payment.method.charAt(0).toUpperCase() + payment.method.slice(1),
      new Date(payment.created_at * 1000).toLocaleDateString(),
      payment.order_id || "N/A",
    ])

    // Add table
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 32,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [79, 70, 229],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 14, right: 14 },
    })

    // Convert to buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"))

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="razorpay_payments.pdf"',
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
