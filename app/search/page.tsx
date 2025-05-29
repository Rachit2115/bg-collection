"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/products/product-grid"
import { products } from "@/lib/data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setSearchQuery(query)

    if (query) {
      setIsLoading(true)

      // Simulate search delay
      const timer = setTimeout(() => {
        const results = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )

        setSearchResults(results)
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()

    // Update URL with search query
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url)

    // Trigger search
    if (searchQuery) {
      setIsLoading(true)

      // Simulate search delay
      setTimeout(() => {
        const results = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )

        setSearchResults(results)
        setIsLoading(false)
      }, 500)
    } else {
      setSearchResults([])
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])

    // Update URL by removing search query
    const url = new URL(window.location.href)
    url.searchParams.delete("q")
    window.history.pushState({}, "", url)
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-serif font-bold text-center mb-6">Search Products</h1>

        <form onSubmit={handleSearch} className="relative">
          <Input
            type="search"
            placeholder="Search for products, categories, or keywords..."
            className="h-12 pl-12 pr-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />

          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-12 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}

          <Button type="submit" className="absolute right-0 top-0 h-12 rounded-l-none">
            Search
          </Button>
        </form>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-muted-foreground">Searching for "{searchQuery}"...</p>
          </div>
        ) : searchQuery ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-medium">
                {searchResults.length === 0
                  ? `No results found for "${searchQuery}"`
                  : `${searchResults.length} results for "${searchQuery}"`}
              </h2>
            </div>

            {searchResults.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <ProductGrid products={searchResults} />
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-medium mb-2">Search for products</h2>
            <p className="text-muted-foreground">Enter a search term to find products, categories, or brands.</p>
          </div>
        )}
      </div>
    </div>
  )
}
