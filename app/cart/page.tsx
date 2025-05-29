"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/cart-provider"
import { ProductCard } from "@/components/products/product-card"
import { products } from "@/lib/data"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 1000 ? 0 : 100
  const total = subtotal - discount + shipping

  const recommendedProducts = products.filter((p) => !cart.some((item) => item.id === p.id)).slice(0, 4)

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price)
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild size="lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col sm:flex-row gap-4 border-b pb-6"
              >
                <div className="w-full sm:w-24 h-24 relative rounded-md overflow-hidden flex-shrink-0">
                  <Image src={item.images[0] || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        <span className="capitalize">Color: {item.selectedColor}</span> / Size: {item.selectedSize}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatPrice(item.price)}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-input rounded-md w-32">
                      <button
                        onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                        className="flex-1 h-8 flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="flex-1 h-8 flex items-center justify-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className="flex-1 h-8 flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item)} aria-label="Remove item">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between font-medium text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleApplyPromo} disabled={promoApplied}>
                  Apply
                </Button>
              </div>

              {promoApplied && (
                <div className="text-sm text-green-600 mb-4">Promo code WELCOME10 applied successfully!</div>
              )}

              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">
                  Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <div className="mt-4 text-xs text-center text-muted-foreground">Secure checkout powered by Stripe</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-serif font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
