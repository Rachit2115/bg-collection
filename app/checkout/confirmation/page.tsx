"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, Package, Printer, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    // Get order data from localStorage
    const storedOrder = localStorage.getItem("lastOrder")
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder))
    } else {
      // If no order data, redirect to home
      router.push("/")
    }

    // Clear cart after successful order
    localStorage.setItem("cart", JSON.stringify([]))
  }, [router])

  if (!orderData) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="max-w-md mx-auto">
          <Package className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-serif font-bold mb-4">Loading order details...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6"
          >
            <CheckCircle className="h-10 w-10" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">Thank you for your purchase. Your order has been received.</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h2 className="font-medium text-lg">Order #{orderData.orderId}</h2>
              <p className="text-muted-foreground">Placed on {orderData.date}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print Receipt
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Shipping Information</h3>
              <p className="text-sm text-muted-foreground">
                {orderData.customerName}
                <br />
                {orderData.address}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Delivery Method</h3>
              <p className="text-sm text-muted-foreground">
                {orderData.shippingMethod === "express"
                  ? "Express Delivery (1-2 business days)"
                  : "Standard Delivery (3-5 business days)"}
              </p>

              <h3 className="font-medium mt-4 mb-2">Payment Method</h3>
              <p className="text-sm text-muted-foreground">
                {orderData.paymentMethod === "card"
                  ? "Credit Card ending in 3456"
                  : orderData.paymentMethod === "paypal"
                    ? "PayPal"
                    : "Apple Pay"}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>

          <div className="space-y-4">
            {orderData.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-16 h-16 bg-muted rounded-md flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    <span className="capitalize">Color: {item.selectedColor}</span> / Size: {item.selectedSize}
                  </div>
                  <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{orderData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{orderData.shipping === 0 ? "Free" : `₹${orderData.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>₹{orderData.tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation email to <strong>{orderData.email}</strong> with your order details.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/profile">View Your Orders</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
