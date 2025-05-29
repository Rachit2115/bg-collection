"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductSort } from "@/components/products/product-sort"
import { Button } from "@/components/ui/button"
import { X, Filter, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { products } from "@/lib/data"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get("category")
  const searchQuery = searchParams.get("q") || ""

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [activeFilters, setActiveFilters] = useState({
    category: categoryParam || "",
    color: "",
    size: "",
    price: "",
    rating: "",
  })
  const [sortOption, setSortOption] = useState("newest")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let result = [...products]

    // Apply search query filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (activeFilters.category) {
      result = result.filter((product) => product.category === activeFilters.category)
    }

    // Apply color filter
    if (activeFilters.color) {
      result = result.filter((product) => product.colors.includes(activeFilters.color))
    }

    // Apply size filter
    if (activeFilters.size) {
      result = result.filter((product) => product.sizes.includes(activeFilters.size))
    }

    // Apply price filter
    if (activeFilters.price) {
      const [min, max] = activeFilters.price.split("-").map(Number)
      result = result.filter((product) => product.price >= min && product.price <= max)
    }

    // Apply rating filter
    if (activeFilters.rating) {
      const minRating = Number.parseInt(activeFilters.rating)
      result = result.filter((product) => product.rating >= minRating)
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "popular":
        result.sort((a, b) => b.popularity - a.popularity)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredProducts(result)
  }, [activeFilters, sortOption, searchQuery])

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))

    // Update URL with filter parameters
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(filterType, value)
    } else {
      params.delete(filterType)
    }

    // Keep search query if it exists
    if (searchQuery) {
      params.set("q", searchQuery)
    }

    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setActiveFilters({
      category: "",
      color: "",
      size: "",
      price: "",
      rating: "",
    })

    // Clear all filter parameters from URL but keep search query
    const params = new URLSearchParams()
    if (searchQuery) {
      params.set("q", searchQuery)
    }

    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const handleSearch = (e) => {
    e.preventDefault()

    // Update URL with search query
    const params = new URLSearchParams(searchParams.toString())

    if (localSearchQuery) {
      params.set("q", localSearchQuery)
    } else {
      params.delete("q")
    }

    router.push(`/products?${params.toString()}`)
  }

  const hasActiveFilters = Object.values(activeFilters).some((filter) => filter !== "")

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto py-8">
          <Skeleton className="h-10 w-64 mb-8" />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Skeleton */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-6 w-32" />
                      <div className="space-y-2">
                        {[1, 2, 3].map((j) => (
                          <Skeleton key={j} className="h-5 w-full" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Filters Skeleton */}
            <div className="lg:hidden mb-6">
              <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>

            <div className="flex-1">
              <div className="hidden lg:flex justify-between items-center mb-6">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-10 w-40" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-serif font-bold mb-8"
        >
          {searchQuery ? `Search Results for "${searchQuery}"` : "Our Collection"}
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-sm text-muted-foreground keyboard-focus"
                    aria-label="Clear all filters"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Search input for desktop */}
              <div className="mb-6">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    className="pl-10 pr-4 keyboard-focus"
                    aria-label="Search products"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Button type="submit" size="sm" className="absolute right-1 top-1 h-7" aria-label="Search">
                    Go
                  </Button>
                </form>
              </div>

              <ProductFilters activeFilters={activeFilters} onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden mb-6">
            <div className="flex flex-col gap-4">
              {/* Search input for mobile */}
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="pl-10 pr-4 keyboard-focus"
                  aria-label="Search products"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Button type="submit" size="sm" className="absolute right-1 top-1 h-7" aria-label="Search">
                  Go
                </Button>
              </form>

              <div className="flex justify-between items-center">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center keyboard-focus">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                      {hasActiveFilters && (
                        <Badge className="ml-2 px-1 py-0 h-5">
                          {Object.values(activeFilters).filter(Boolean).length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Filters</h2>
                      {hasActiveFilters && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="text-sm text-muted-foreground keyboard-focus"
                          aria-label="Clear all filters"
                        >
                          Clear all
                        </Button>
                      )}
                    </div>
                    <ProductFilters
                      activeFilters={activeFilters}
                      onFilterChange={handleFilterChange}
                      onClose={() => setMobileFiltersOpen(false)}
                    />
                  </SheetContent>
                </Sheet>

                <ProductSort value={sortOption} onChange={setSortOption} />
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-4">
                {Object.entries(activeFilters).map(([key, value]) => {
                  if (!value) return null
                  return (
                    <div key={key} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
                      <span className="capitalize">
                        {key}: {value}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 ml-1 p-0 keyboard-focus"
                        onClick={() => handleFilterChange(key, "")}
                        aria-label={`Remove ${key} filter`}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
              <ProductSort value={sortOption} onChange={setSortOption} />
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">No products found</h2>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={clearFilters} className="keyboard-focus">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
