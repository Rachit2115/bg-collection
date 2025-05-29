"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, ShieldCheck, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import { processOrder } from "../actions/order-actions"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    sameAsShipping: true,
  })

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = formData.shippingMethod === "express" ? 250 : subtotal > 1000 ? 0 : 100
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + shipping + tax

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (step === 1) {
      setStep(2)
      window.scrollTo(0, 0)
    } else if (step === 2) {
      setStep(3)
      window.scrollTo(0, 0)
    } else {
      // Process the order
      setIsSubmitting(true)

      try {
        // Create form data for server action
        const orderFormData = new FormData()

        // Add all form fields
        Object.entries(formData).forEach(([key, value]) => {
          orderFormData.append(key, value)
        })

        // Add order details
        orderFormData.append("items", JSON.stringify(cart))
        orderFormData.append("subtotal", subtotal.toString())
        orderFormData.append("shipping", shipping.toString())
        orderFormData.append("tax", tax.toString())
        orderFormData.append("total", total.toString())

        // Submit order
        const result = await processOrder(orderFormData)

        if (result.success) {
          // Store order data for confirmation page
          localStorage.setItem("lastOrder", JSON.stringify(result.order))

          // Clear cart
          clearCart()

          // Redirect to confirmation page
          router.push("/checkout/confirmation")
        } else {
          throw new Error(result.message || "Failed to process order")
        }
      } catch (error) {
        console.error("Order submission error:", error)
        toast({
          title: "Order processing failed",
          description: error.message || "There was an error processing your order. Please try again.",
          variant: "destructive",
        })
        setIsSubmitting(false)
      }
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-serif font-bold">Checkout</h1>
      </div>

      {/* Checkout Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              1
            </div>
            <span className="text-sm">Shipping</span>
          </div>
          <div className={`w-20 h-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              2
            </div>
            <span className="text-sm">Payment</span>
          </div>
          <div className={`w-20 h-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
          <div className={`flex flex-col items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              3
            </div>
            <span className="text-sm">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip/Postal Code</Label>
                      <Input id="zip" name="zip" value={formData.zip} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
                    <RadioGroup
                      value={formData.shippingMethod}
                      onValueChange={(value) => handleRadioChange("shippingMethod", value)}
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 flex justify-between cursor-pointer">
                          <div className="flex items-center">
                            <Truck className="mr-2 h-4 w-4" />
                            <span>Standard Shipping (3-5 business days)</span>
                          </div>
                          <span>{shipping === 0 ? "Free" : formatPrice(100)}</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-4">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 flex justify-between cursor-pointer">
                          <div className="flex items-center">
                            <Truck className="mr-2 h-4 w-4" />
                            <span>Express Shipping (1-2 business days)</span>
                          </div>
                          <span>{formatPrice(250)}</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Tabs
                    defaultValue="card"
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleRadioChange("paymentMethod", value)}
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="space-y-6 pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required={formData.paymentMethod === "card"}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required={formData.paymentMethod === "card"}
                          />
                          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required={formData.paymentMethod === "card"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            name="cvc"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={handleInputChange}
                            required={formData.paymentMethod === "card"}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-muted-foreground">
                          Your payment information is secure and encrypted
                        </span>
                      </div>
                    </TabsContent>
                    <TabsContent value="paypal" className="pt-6">
                      <div className="text-center py-12">
                        <p className="text-muted-foreground mb-6">
                          You will be redirected to PayPal to complete your payment.
                        </p>
                        <Image
                          src="/placeholder.svg?height=60&width=200"
                          alt="PayPal"
                          width={200}
                          height={60}
                          className="mx-auto"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="apple" className="pt-6">
                      <div className="text-center py-12">
                        <p className="text-muted-foreground mb-6">
                          You will be redirected to Apple Pay to complete your payment.
                        </p>
                        <Image
                          src="/placeholder.svg?height=60&width=200"
                          alt="Apple Pay"
                          width={200}
                          height={60}
                          className="mx-auto"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        id="sameAsShipping"
                        name="sameAsShipping"
                        checked={formData.sameAsShipping}
                        onChange={handleCheckboxChange}
                      />
                      <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>

                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.state} {formData.zip}
                      <br />
                      {formData.country}
                      <br />
                      {formData.email}
                      <br />
                      {formData.phone}
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.paymentMethod === "card" ? (
                        <>
                          Credit Card ending in {formData.cardNumber.slice(-4)}
                          <br />
                          Expiry: {formData.expiry}
                        </>
                      ) : formData.paymentMethod === "paypal" ? (
                        "PayPal"
                      ) : (
                        "Apple Pay"
                      )}
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Shipping Method</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.shippingMethod === "express"
                        ? "Express Shipping (1-2 business days)"
                        : "Standard Shipping (3-5 business days)"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                          <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <div className="text-xs text-muted-foreground mt-1">
                                  <span className="capitalize">Color: {item.selectedColor}</span> / Size:{" "}
                                  {item.selectedSize}
                                </div>
                                <div className="text-xs text-muted-foreground">Quantity: {item.quantity}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button type="button" className="flex-1" onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between font-medium text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
