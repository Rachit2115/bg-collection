"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"
import { useAuth } from "@/components/auth/auth-provider"
import { products } from "@/lib/data"

export default function WishlistPage() {
  const { user } = useAuth()

  // Sample wishlist data
  const [wishlist, setWishlist] = useState(products.slice(0, 6))

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId))
  }

  if (!user) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-serif font-bold mb-4">Sign in to view your wishlist</h1>
          <p className="text-muted-foreground mb-8">Please sign in to access your saved items.</p>
          <Button asChild size="lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-serif font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">Save items you love to your wishlist for easy access later.</p>
          <Button asChild size="lg">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold">My Wishlist</h1>
        <Button variant="outline" asChild>
          <Link href="/products">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProductCard product={product} wishlistView onRemoveFromWishlist={() => removeFromWishlist(product.id)} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
