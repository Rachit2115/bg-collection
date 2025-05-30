"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Package, Truck, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  selectedColor?: string
  selectedSize?: string
}

interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered"
  items: OrderItem[]
  total: number
  shippingAddress: string
  trackingNumber: string | null
  customerName: string
  email: string
  phone: string
  shippingMethod: string
  paymentMethod: string
  subtotal: number
  shipping: number
  tax: number
}

const statusConfig = {
  processing: {
    label: "Processing",
    icon: Package,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-800 border-green-200",
  },
}

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = localStorage.getItem("orders")
    if (storedOrders) {
      const orders = JSON.parse(storedOrders)
      const foundOrder = orders.find((o: Order) => o.id === params.orderId)
      if (foundOrder) {
        setOrder(foundOrder)
      }
    }
    setLoading(false)
  }, [params.orderId])

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardContent className="py-10 text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-spin" />
            <h3 className="text-lg font-medium mb-2">Loading order details...</h3>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardContent className="py-10 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Order not found</h3>
            <p className="text-muted-foreground mb-4">The order you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/orders")}>Back to Orders</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const StatusIcon = statusConfig[order.status].icon

  return (
    <div className="container mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-bold">Order Details</h1>
          <Button variant="outline" onClick={() => router.push("/orders")}>
            Back to Orders
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {order.date}</CardDescription>
                  </div>
                  <Badge variant="outline" className={statusConfig[order.status].color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig[order.status].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                          <div className="relative h-24 w-24 rounded-md overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            {item.selectedColor && item.selectedSize && (
                              <p className="text-sm text-muted-foreground">
                                Color: {item.selectedColor} / Size: {item.selectedSize}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                            <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <p className="text-sm">{order.shippingAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatPrice(order.tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>

                  {order.trackingNumber && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">Tracking Information</h3>
                        <p className="text-sm">Tracking Number: {order.trackingNumber}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 