"use server"

const WEB3FORMS_ACCESS_KEY = "d438427d-894e-41ec-8ae2-18caa7a54c06"
const RECIPIENT_EMAIL = "rachit2115cool@gmail.com"

export async function processOrder(formData: FormData) {
  try {
    // Extract order data from form
    const orderData = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "processing" as const,
      items: JSON.parse(formData.get("items") as string).map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.images[0] || "/placeholder.svg",
      })),
      total: Number.parseFloat(formData.get("total") as string),
      shippingAddress: `${formData.get("address")}, ${formData.get("city")}, ${formData.get("state")}, ${formData.get("zip")}, ${formData.get("country")}`,
      trackingNumber: null,
      customerName: formData.get("firstName") + " " + formData.get("lastName"),
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      shippingMethod: formData.get("shippingMethod") || "standard",
      paymentMethod: formData.get("paymentMethod") || "card",
      subtotal: Number.parseFloat(formData.get("subtotal") as string),
      shipping: Number.parseFloat(formData.get("shipping") as string),
      tax: Number.parseFloat(formData.get("tax") as string),
    }

    // Send order confirmation via Web3Forms
    await sendOrderNotification(orderData)

    // Return success response with order data
    return {
      success: true,
      message: "Order placed successfully!",
      order: orderData,
    }
  } catch (error) {
    console.error("Error processing order:", error)
    return {
      success: false,
      message: "Failed to process your order. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

async function sendOrderNotification(orderData: any): Promise<boolean> {
  try {
    // Create order items summary
    const itemsSummary = orderData.items
      .map(
        (item: any) =>
          `- ${item.name} (${item.selectedColor}, ${item.selectedSize}) x${item.quantity} = ₹${(
            item.price * item.quantity
          ).toFixed(2)}`,
      )
      .join("\n")

    // Create order details message
    const orderMessage = `
🛍️ NEW ORDER RECEIVED - BG Collection

📋 ORDER DETAILS:
Order ID: ${orderData.orderId}
Date: ${orderData.date}
Customer: ${orderData.customerName}
Email: ${orderData.email}
Phone: ${orderData.phone}

📦 SHIPPING ADDRESS:
${orderData.address}

🚚 SHIPPING METHOD:
${orderData.shippingMethod === "express" ? "Express Delivery (1-2 business days)" : "Standard Delivery (3-5 business days)"}

💳 PAYMENT METHOD:
${orderData.paymentMethod === "card" ? "Credit Card" : orderData.paymentMethod}

🛒 ORDER ITEMS:
${itemsSummary}

💰 ORDER SUMMARY:
Subtotal: ₹${orderData.subtotal.toFixed(2)}
Shipping: ${orderData.shipping === 0 ? "Free" : `₹${orderData.shipping.toFixed(2)}`}
GST (18%): ₹${orderData.tax.toFixed(2)}
Total: ₹${orderData.total.toFixed(2)}

---
This order was placed through BG Collection website.
    `.trim()

    // Send via Web3Forms
    const web3FormsData = new FormData()
    web3FormsData.append("access_key", WEB3FORMS_ACCESS_KEY)
    web3FormsData.append("subject", `New Order #${orderData.orderId} - BG Collection`)
    web3FormsData.append("from_name", "BG Collection Website")
    web3FormsData.append("message", orderMessage)
    web3FormsData.append("email", RECIPIENT_EMAIL)

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: web3FormsData,
    })

    const result = await response.json()

    if (result.success) {
      console.log("Order notification sent successfully via Web3Forms")
      return true
    } else {
      console.error("Failed to send order notification:", result)
      return false
    }
  } catch (error) {
    console.error("Error sending order notification:", error)
    return false
  }
}
