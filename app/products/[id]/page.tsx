"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, ChevronDown, ChevronUp, Check, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/products/product-card"
import { ImageGallery } from "@/components/products/image-gallery"
import { useCart } from "@/components/cart/cart-provider"
import { useWishlist } from "@/components/wishlist/wishlist-provider"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { products } from "@/lib/data"
import { ReviewForm } from "@/components/products/review-form"

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    date: "2 weeks ago",
    rating: 5,
    title: "Absolutely beautiful piece!",
    content:
      "This exceeded my expectations. The quality is exceptional and it fits perfectly in my living room. Will definitely be purchasing more items from this collection.",
    helpful: 24,
    verified: true,
  },
  {
    id: 2,
    name: "Rahul Mehta",
    date: "1 month ago",
    rating: 4,
    title: "Great quality, minor design flaw",
    content:
      "The product is well-made and looks elegant. The only issue I found was a small design flaw that makes it slightly unstable on uneven surfaces. Otherwise, it's a great addition to my home.",
    helpful: 18,
    verified: true,
  },
  {
    id: 3,
    name: "Ananya Patel",
    date: "2 months ago",
    rating: 5,
    title: "Perfect gift!",
    content:
      "I bought this as a housewarming gift for my friend and they absolutely loved it! The packaging was beautiful and the product itself is stunning. Highly recommend for gifting.",
    helpful: 32,
    verified: true,
  },
  {
    id: 4,
    name: "Vikram Singh",
    date: "3 months ago",
    rating: 3,
    title: "Good but overpriced",
    content:
      "The quality is good but I think it's a bit overpriced for what it is. I've seen similar items for less elsewhere. That said, the design is unique and it does look premium.",
    helpful: 15,
    verified: false,
  },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const product = products.find((p) => p.id === params.id)

  const [productFound, setProductFound] = useState(!!product)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [reviews, setReviews] = useState(sampleReviews)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!product) {
      router.push("/products")
      setProductFound(false)
    } else {
      setProductFound(true)
      // Set default selections
      if (product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0])
      }
      if (product.colors.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0])
      }
    }
  }, [product, router, selectedSize, selectedColor])

  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      })
      return
    }

    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      })
      return
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleAddToWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleReviewHelpful = (reviewId) => {
    setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)))
    toast({
      title: "Thank you for your feedback",
      description: "You marked this review as helpful",
    })
  }

  const handleReviewSubmitted = (reviewData: { rating: number; name: string; title: string; content: string }) => {
    const newReview = {
      id: reviews.length + 1,
      name: reviewData.name,
      date: "Just now",
      rating: reviewData.rating,
      title: reviewData.title,
      content: reviewData.content,
      helpful: 0,
      verified: true,
    }
    setReviews([newReview, ...reviews])
  }

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images Skeleton */}
            <div>
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20 w-20 rounded-md" />
                ))}
              </div>
            </div>

            {/* Product Details Skeleton */}
            <div className="flex flex-col">
              <Skeleton className="h-4 w-48 mb-4" />
              <Skeleton className="h-10 w-3/4 mb-2" />
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4 rounded-full mr-1" />
                  ))}
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-8 w-32 mb-6" />

              <Skeleton className="h-6 w-40 mb-3" />
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded-full" />
                ))}
              </div>

              <Skeleton className="h-6 w-40 mb-3" />
              <div className="grid grid-cols-5 gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 rounded-md" />
                ))}
              </div>

              <Skeleton className="h-6 w-40 mb-3" />
              <Skeleton className="h-10 w-32 mb-6" />

              <Skeleton className="h-6 w-full mb-6" />

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Skeleton className="h-12 flex-1 rounded-md" />
                <Skeleton className="h-12 flex-1 rounded-md" />
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!productFound) {
    return null
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <ImageGallery images={product.images} />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            {/* Breadcrumbs */}
            <div className="text-sm text-muted-foreground mb-4">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-1">
                  <li>
                    <a href="/" className="hover:text-primary">
                      Home
                    </a>
                  </li>
                  <li>
                    <span className="mx-1">/</span>
                  </li>
                  <li>
                    <a href="/products" className="hover:text-primary">
                      Products
                    </a>
                  </li>
                  <li>
                    <span className="mx-1">/</span>
                  </li>
                  <li>
                    <a href={`/products?category=${product.category}`} className="hover:text-primary capitalize">
                      {product.category.replace("-", " ")}
                    </a>
                  </li>
                  <li>
                    <span className="mx-1">/</span>
                  </li>
                  <li aria-current="page">{product.name}</li>
                </ol>
              </nav>
            </div>

            {/* Product Title and Rating */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
              </div>
              <div className="text-2xl font-bold">{formatPrice(product.price)}</div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 keyboard-focus ${
                      selectedColor === color ? "border-primary" : "border-transparent"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      boxShadow: selectedColor === color ? "0 0 0 2px white, 0 0 0 4px hsl(var(--primary))" : "none",
                    }}
                    aria-label={`Select ${color} color`}
                    aria-pressed={selectedColor === color}
                  >
                    {selectedColor === color && (
                      <Check
                        className={`h-5 w-5 mx-auto ${
                          ["white", "beige", "cream"].includes(color.toLowerCase()) ? "text-black" : "text-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium">Size: {selectedSize}</h3>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="link" size="sm" className="h-auto p-0 keyboard-focus">
                      Size Guide
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Size Guide</SheetTitle>
                      <SheetDescription>Find your perfect fit with our size guide.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 text-left">Size</th>
                            <th className="py-2 text-left">Dimensions</th>
                            <th className="py-2 text-left">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.sizes.map((size) => (
                            <tr key={size} className="border-b">
                              <td className="py-2">{size}</td>
                              <td className="py-2">Varies</td>
                              <td className="py-2">Standard {size} size</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 border rounded-md transition-colors keyboard-focus ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:border-primary"
                    }`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center border border-input rounded-md w-32">
                <button
                  onClick={decrementQuantity}
                  className="flex-1 h-10 flex items-center justify-center keyboard-focus"
                  aria-label="Decrease quantity"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <span className="flex-1 h-10 flex items-center justify-center font-medium" aria-live="polite">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="flex-1 h-10 flex items-center justify-center keyboard-focus"
                  aria-label="Increase quantity"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                In Stock
              </Badge>
              <span className="text-sm text-muted-foreground">Usually ships within 1-2 business days</span>
            </div>

            {/* Add to Cart and Wishlist */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="flex-1 keyboard-focus"
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 keyboard-focus"
                onClick={handleAddToWishlist}
                aria-label={`${isInWishlist(product.id) ? "Remove" : "Add"} ${product.name} to wishlist`}
              >
                <Heart className={`mr-2 h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Product Information */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger className="keyboard-focus">Description</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{product.description}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="details">
                <AccordionTrigger className="keyboard-focus">Details & Care</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>Material: {product.material}</li>
                    <li>Care: Hand wash or dry clean</li>
                    <li>Imported</li>
                    <li>Dimensions vary by size</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="keyboard-focus">Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <div className="text-muted-foreground">
                    <p className="mb-2">Free standard shipping on all orders over ₹1,000.</p>
                    <p>
                      Returns accepted within 30 days of delivery. Items must be unused with original packaging intact.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        {/* Reviews and Related Products */}
        <div className="mt-20">
          <Tabs defaultValue="reviews">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary keyboard-focus"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger
                value="related"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary keyboard-focus"
              >
                Related Products
              </TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex" aria-label={`Average rating: ${product.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">{product.rating.toFixed(1)} out of 5</span>
                  </div>
                  <div className="space-y-6">
                    {/* Reviews */}
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <h4 className="font-medium">{review.name}</h4>
                            {review.verified && (
                              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex mb-2" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <h5 className="font-medium mb-2">{review.title}</h5>
                        <p className="text-muted-foreground mb-4">{review.content}</p>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-sm flex items-center keyboard-focus"
                            onClick={() => handleReviewHelpful(review.id)}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <ReviewForm
                    productId={product.id}
                    productName={product.name}
                    onReviewSubmitted={handleReviewSubmitted}
                  />
                </div>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Review Breakdown</h3>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <div className="flex items-center w-20">
                          <span>{rating}</span>
                          <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                        </div>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{
                              width: `${
                                rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2
                              }%`,
                            }}
                            aria-label={`${
                              rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2
                            }% of reviews gave ${rating} stars`}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12">
                          {rating === 5
                            ? "70%"
                            : rating === 4
                              ? "20%"
                              : rating === 3
                                ? "5%"
                                : rating === 2
                                  ? "3%"
                                  : "2%"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-3">Review Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">High quality</Badge>
                      <Badge variant="secondary">Great value</Badge>
                      <Badge variant="secondary">Beautiful design</Badge>
                      <Badge variant="secondary">Durable</Badge>
                      <Badge variant="secondary">Perfect gift</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="related" className="pt-6">
              <h3 className="text-xl font-semibold mb-6">You May Also Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
