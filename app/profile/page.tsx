"use client"

import type React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, Heart, LogOut, Package, Settings, ShoppingBag, User, Upload, Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth/auth-provider"
import { ProductCard } from "@/components/products/product-card"
import { products } from "@/lib/data"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("orders")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showPhotoDialog, setShowPhotoDialog] = useState(false)

  // Sample data
  const orders = [
    {
      id: "ORD-12345",
      date: "May 8, 2023",
      status: "Delivered",
      total: 249.95,
      items: [products[0], products[2]],
    },
    {
      id: "ORD-12344",
      date: "April 15, 2023",
      status: "Processing",
      total: 129.99,
      items: [products[1]],
    },
  ]

  const wishlist = [products[3], products[4], products[5]]

  const recentlyViewed = [products[6], products[7], products[8], products[9]]

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      })
      setIsEditing(false)
    }, 1000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        setIsUploading(false)
        setShowPhotoDialog(false)
        toast({
          title: "Photo Updated",
          description: "Your profile photo has been updated successfully.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeProfileImage = () => {
    setProfileImage(null)
    setShowPhotoDialog(false)
    toast({
      title: "Photo Removed",
      description: "Your profile photo has been removed.",
    })
  }

  const getInitials = () => {
    if (!user) return "U"
    return (
      `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase() ||
      user.name?.charAt(0).toUpperCase() ||
      "U"
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="max-w-md mx-auto">
          <User className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-serif font-bold mb-4">Sign in to view your profile</h1>
          <p className="text-muted-foreground mb-8">Please sign in to access your profile, orders, and wishlist.</p>
          <Button asChild size="lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <motion.div
          className="w-full md:w-64"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="relative mx-auto group">
                <Avatar className="h-20 w-20 mx-auto cursor-pointer" onClick={() => setShowPhotoDialog(true)}>
                  <AvatarImage src={profileImage || ""} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div
                  className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                  onClick={() => setShowPhotoDialog(true)}
                >
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="mt-2">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </Button>
                <Button
                  variant={activeTab === "wishlist" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("wishlist")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button
                  variant={activeTab === "recently-viewed" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("recently-viewed")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Recently Viewed
                </Button>
                <Button
                  variant={activeTab === "payment" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("payment")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6">My Orders</h2>

                  {orders.length === 0 ? (
                    <Card>
                      <CardContent className="py-10 text-center">
                        <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                        <Button asChild>
                          <Link href="/products">Start Shopping</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                                  <CardDescription>Placed on {order.date}</CardDescription>
                                </div>
                                <Badge variant={order.status === "Delivered" ? "outline" : "default"}>
                                  {order.status}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex gap-4">
                                    <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
                                      <Image
                                        src={item.images[0] || "/placeholder.svg"}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium">{item.name}</h4>
                                      <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <Separator className="my-4" />

                              <div className="flex justify-between items-center">
                                <div className="font-medium">Total</div>
                                <div className="font-medium">₹{order.total.toFixed(2)}</div>
                              </div>

                              <div className="mt-4 flex gap-3">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/orders/${order.id}`}>View Details</Link>
                                </Button>
                                <Button variant="outline" size="sm">
                                  Track Order
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "wishlist" && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6">My Wishlist</h2>

                  {wishlist.length === 0 ? (
                    <Card>
                      <CardContent className="py-10 text-center">
                        <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                        <p className="text-muted-foreground mb-4">Save items you love to your wishlist.</p>
                        <Button asChild>
                          <Link href="/products">Explore Products</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * wishlist.indexOf(product) }}
                        >
                          <ProductCard key={product.id} product={product} wishlistView />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "recently-viewed" && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6">Recently Viewed</h2>

                  {recentlyViewed.length === 0 ? (
                    <Card>
                      <CardContent className="py-10 text-center">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No recently viewed items</h3>
                        <p className="text-muted-foreground mb-4">Items you view will appear here.</p>
                        <Button asChild>
                          <Link href="/products">Browse Products</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {recentlyViewed.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 * recentlyViewed.indexOf(product) }}
                        >
                          <ProductCard key={product.id} product={product} />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "payment" && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6">Payment Methods</h2>

                  <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <CardHeader>
                      <CardTitle>Saved Payment Methods</CardTitle>
                      <CardDescription>Manage your saved payment methods for faster checkout.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="bg-muted w-12 h-8 rounded flex items-center justify-center">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Visa ending in 4242</h4>
                              <p className="text-sm text-muted-foreground">Expires 12/25</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>

                      <Button className="mt-6 relative overflow-hidden group">
                        <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out -z-10"></span>
                        Add Payment Method
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6">Account Settings</h2>

                  <Tabs defaultValue="profile">
                    <TabsList className="mb-6">
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="addresses">Addresses</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                      <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle>Profile Information</CardTitle>
                              <CardDescription>Update your personal information.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                              {isEditing ? "Cancel" : "Edit"}
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium">
                                  First Name
                                </label>
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  value={profileData.firstName}
                                  onChange={handleInputChange}
                                  disabled={!isEditing}
                                  className={isEditing ? "border-primary/30 focus:border-primary" : ""}
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium">
                                  Last Name
                                </label>
                                <Input
                                  id="lastName"
                                  name="lastName"
                                  value={profileData.lastName}
                                  onChange={handleInputChange}
                                  disabled={!isEditing}
                                  className={isEditing ? "border-primary/30 focus:border-primary" : ""}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="email" className="text-sm font-medium">
                                Email
                              </label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={isEditing ? "border-primary/30 focus:border-primary" : ""}
                              />
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="phone" className="text-sm font-medium">
                                Phone Number
                              </label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={profileData.phone}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={isEditing ? "border-primary/30 focus:border-primary" : ""}
                              />
                            </div>

                            {isEditing && (
                              <Button
                                type="button"
                                onClick={handleSaveChanges}
                                className="relative overflow-hidden group"
                              >
                                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out -z-10"></span>
                                Save Changes
                              </Button>
                            )}
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="addresses">
                      <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>Addresses</CardTitle>
                          <CardDescription>Manage your shipping and billing addresses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">Home Address</h4>
                                <Badge>Default</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                John Doe
                                <br />
                                123 Main Street
                                <br />
                                New York, NY 10001
                                <br />
                                United States
                              </p>
                              <div className="mt-4 flex gap-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>

                          <Button className="mt-6 relative overflow-hidden group">
                            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out -z-10"></span>
                            Add New Address
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="notifications">
                      <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>Notification Preferences</CardTitle>
                          <CardDescription>Manage how you receive notifications.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Order Updates</h4>
                                <p className="text-sm text-muted-foreground">
                                  Receive notifications about your order status.
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="order-email" defaultChecked />
                                <label htmlFor="order-email" className="text-sm">
                                  Email
                                </label>
                                <Checkbox id="order-sms" defaultChecked />
                                <label htmlFor="order-sms" className="text-sm">
                                  SMS
                                </label>
                              </div>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Promotions</h4>
                                <p className="text-sm text-muted-foreground">
                                  Receive notifications about sales and promotions.
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="promo-email" defaultChecked />
                                <label htmlFor="promo-email" className="text-sm">
                                  Email
                                </label>
                                <Checkbox id="promo-sms" />
                                <label htmlFor="promo-sms" className="text-sm">
                                  SMS
                                </label>
                              </div>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">New Arrivals</h4>
                                <p className="text-sm text-muted-foreground">
                                  Receive notifications about new products.
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="new-email" defaultChecked />
                                <label htmlFor="new-email" className="text-sm">
                                  Email
                                </label>
                                <Checkbox id="new-sms" />
                                <label htmlFor="new-sms" className="text-sm">
                                  SMS
                                </label>
                              </div>
                            </div>
                          </div>

                          <Button className="mt-6 relative overflow-hidden group">
                            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out -z-10"></span>
                            Save Preferences
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="security">
                      <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>Security Settings</CardTitle>
                          <CardDescription>Manage your password and security preferences.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form className="space-y-6">
                            <div className="space-y-2">
                              <label htmlFor="current-password" className="text-sm font-medium">
                                Current Password
                              </label>
                              <Input id="current-password" type="password" className="focus:border-primary" />
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="new-password" className="text-sm font-medium">
                                New Password
                              </label>
                              <Input id="new-password" type="password" className="focus:border-primary" />
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="confirm-password" className="text-sm font-medium">
                                Confirm New Password
                              </label>
                              <Input id="confirm-password" type="password" className="focus:border-primary" />
                            </div>

                            <Button type="submit" className="relative overflow-hidden group">
                              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out -z-10"></span>
                              Update Password
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Profile Photo Dialog */}
      <Dialog open={showPhotoDialog} onOpenChange={setShowPhotoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Photo</DialogTitle>
            <DialogDescription>Upload a new profile photo or remove your current one.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-5 space-y-5">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage || ""} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-medium">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

            <div className="flex gap-4">
              <Button onClick={triggerFileInput} className="relative overflow-hidden group" disabled={isUploading}>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out -z-10"></span>
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload Photo"}
              </Button>

              {profileImage && (
                <Button variant="outline" onClick={removeProfileImage}>
                  <X className="mr-2 h-4 w-4" />
                  Remove Photo
                </Button>
              )}
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
