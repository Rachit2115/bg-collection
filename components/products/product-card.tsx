"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag, Star, Trash2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart/cart-provider"
import { useToast } from "@/components/ui/use-toast"

export function ProductCard({ product, wishlistView = false, onRemoveFromWishlist }) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = () => {
    setIsAddingToCart(true)

    // Add to cart with animation
    setTimeout(() => {
      addToCart({
        ...product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0],
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })

      setIsAddingToCart(false)
    }, 600)
  }

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Generate stars for ratings
  const renderStars = (rating) => {
    return (
      <div className="flex items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : i < rating
                  ? "text-yellow-400 fill-yellow-400 opacity-50"
                  : "text-gray-300"
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="ml-1 text-xs">({product.reviewCount})</span>
      </div>
    )
  }

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      layout
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/50 card-hover">
        <Link
          href={`/products/${product.id}`}
          aria-label={`View details for ${product.name}`}
          className="keyboard-focus block h-full"
        >
          <motion.div className="h-full w-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300"
            />
          </motion.div>

          {/* Overlay gradient on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity"
            animate={{ opacity: isHovered ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        {/* Quick actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-end justify-center p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex w-full gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="secondary"
                    size="icon"
                    className={`h-10 w-10 rounded-full shadow-lg keyboard-focus ${isAddingToCart ? "cart-bounce" : ""}`}
                    onClick={handleAddToCart}
                    aria-label={`Add ${product.name} to cart`}
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <Sparkles className="h-5 w-5 text-primary" />
                    ) : (
                      <ShoppingBag className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  {wishlistView ? (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10 rounded-full shadow-lg keyboard-focus"
                      onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10 rounded-full shadow-lg keyboard-focus"
                      aria-label={`Add ${product.name} to wishlist`}
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  )}
                </motion.div>

                <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="secondary" className="w-full shadow-lg keyboard-focus btn-ripple" asChild>
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* New badge */}
        {new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000 && (
          <Badge className="absolute left-2 top-2 bg-secondary hover:bg-secondary/90">New</Badge>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate font-poppins">{product.name}</h3>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="font-medium text-primary">{formatPrice(product.price)}</p>
          {renderStars(product.rating)}
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 font-inter">{product.description}</p>
      </div>
    </motion.div>
  )
}
