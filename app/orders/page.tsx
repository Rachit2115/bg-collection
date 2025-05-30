"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Package, Truck, CheckCircle2, Clock, LucideIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart/cart-provider"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ReviewForm } from "@/components/products/review-form"
import Image from "next/image"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered"
  items: OrderItem[]
  total: number
  shippingAddress: string
  trackingNumber: string | null
}

type StatusConfig = {
  [K in Order["status"]]: {
    label: string
    icon: LucideIcon
    color: string
  }
}

// Sample orders data
const initialOrders: Order[] = [
  {
    id: "ORD001",
    date: "2024-03-15",
    status: "delivered",
    items: [
      {
        id: "1",
        name: "Leather Journal",
        price: 1499,
        quantity: 1,
        image: "/images/leather-journal.jpg",
      },
    ],
    total: 1499,
    shippingAddress: "123 Main St, Mumbai, Maharashtra 400001",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD002",
    date: "2024-03-10",
    status: "shipped",
    items: [
      {
        id: "2",
        name: "Brass Bowl",
        price: 2499,
        quantity: 1,
        image: "/images/brass-bowl.jpg",
      },
    ],
    total: 2499,
    shippingAddress: "456 Park Ave, Delhi, Delhi 110001",
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD003",
    date: "2024-03-05",
    status: "processing",
    items: [
      {
        id: "3",
        name: "Minimal Clock",
        price: 3499,
        quantity: 1,
        image: "/images/minimal-clock.jpg",
      },
    ],
    total: 3499,
    shippingAddress: "789 Lake View, Bangalore, Karnataka 560001",
    trackingNumber: null,
  },
]

const statusConfig: StatusConfig = {
  processing: {
    label: "Processing",
    icon: Clock,
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

function OrderDetailsDialog({ 
  order, 
  isOpen, 
  onClose 
}: { 
  order: Order
  isOpen: boolean
  onClose: () => void 
}) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Get status config with fallback
  const status = statusConfig[order.status] || {
    label: "Unknown",
    icon: Package,
    color: "bg-gray-100 text-gray-800 border-gray-200",
  }
  const StatusIcon = status.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details #{order.id}</DialogTitle>
          <DialogDescription>
            Placed on {order.date}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">Order Status</h3>
              <Badge variant="outline" className={status.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {status.label}
              </Badge>
            </div>
            {order.trackingNumber && (
              <div>
                <h3 className="font-medium">Tracking Number</h3>
                <p className="text-sm">{order.trackingNumber}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-2">Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={`${order.id}-${item.id}`} className="flex gap-4 p-4 border rounded-lg">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <p className="text-sm">{order.shippingAddress}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function OrderCard({ order }: { order: Order }) {
  const router = useRouter()
  const [showDetails, setShowDetails] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Get status config with fallback
  const status = statusConfig[order.status] || {
    label: "Unknown",
    icon: Package,
    color: "bg-gray-100 text-gray-800 border-gray-200",
  }
  const StatusIcon = status.icon

  const handleReviewSubmitted = (reviewData: { rating: number; name: string; title: string; content: string }) => {
    // Here you would typically send the review to your backend
    console.log("Review submitted:", reviewData)
    setShowReviewForm(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border rounded-lg p-6 space-y-4"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Order #{order.id}</h3>
            <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
          </div>
          <Badge variant="outline" className={status.color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
        </div>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={`${order.id}-${item.id}`} className="flex gap-4">
              <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                <p className="text-sm font-medium">{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Shipping Address</p>
              <p className="text-sm">{order.shippingAddress}</p>
              {order.trackingNumber && (
                <p className="text-sm text-muted-foreground mt-1">
                  Tracking: {order.trackingNumber}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-lg font-medium">{formatPrice(order.total)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </Button>
          {order.status === "delivered" && (
            <Button 
              size="sm"
              onClick={() => setShowReviewForm(true)}
            >
              Write a Review
            </Button>
          )}
        </div>
      </motion.div>

      <OrderDetailsDialog 
        order={order}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />

      {showReviewForm && (
        <ReviewForm
          productId={order.items[0].id}
          productName={order.items[0].name}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}
    </>
  )
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = localStorage.getItem("orders")
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    } else {
      // If no orders in localStorage, use initial orders
      setOrders(initialOrders)
      localStorage.setItem("orders", JSON.stringify(initialOrders))
    }

    // Check for new order in localStorage
    const lastOrder = localStorage.getItem("lastOrder")
    if (lastOrder) {
      const newOrder = JSON.parse(lastOrder)
      // Add the new order to the beginning of the orders list
      setOrders((prevOrders) => {
        const updatedOrders = [newOrder, ...prevOrders]
        localStorage.setItem("orders", JSON.stringify(updatedOrders))
        return updatedOrders
      })
      // Clear the lastOrder from localStorage
      localStorage.removeItem("lastOrder")
    }

    // Set up an event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "lastOrder" && e.newValue) {
        const newOrder = JSON.parse(e.newValue)
        setOrders((prevOrders) => {
          const updatedOrders = [newOrder, ...prevOrders]
          localStorage.setItem("orders", JSON.stringify(updatedOrders))
          return updatedOrders
        })
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={`order-${order.id}`} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          {orders
            .filter((order) => order.status === "processing")
            .map((order) => (
              <OrderCard key={`processing-${order.id}`} order={order} />
            ))}
        </TabsContent>

        <TabsContent value="shipped" className="space-y-6">
          {orders
            .filter((order) => order.status === "shipped")
            .map((order) => (
              <OrderCard key={`shipped-${order.id}`} order={order} />
            ))}
        </TabsContent>

        <TabsContent value="delivered" className="space-y-6">
          {orders
            .filter((order) => order.status === "delivered")
            .map((order) => (
              <OrderCard key={`delivered-${order.id}`} order={order} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
} 