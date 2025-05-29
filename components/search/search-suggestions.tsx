"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { products } from "@/lib/data"
import { Search } from "lucide-react"

interface SearchSuggestionsProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchSuggestions({ isOpen, onClose }: SearchSuggestionsProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<typeof products>([])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSuggestions(filteredProducts.slice(0, 5)) // Show top 5 suggestions
    } else {
      setSuggestions([])
    }
  }, [searchQuery])

  const handleSelect = (productId: string) => {
    router.push(`/products/${productId}`)
    onClose()
  }

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
    onClose()
  }

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="Search products..."
        value={searchQuery}
        onValueChange={setSearchQuery}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchQuery.trim()) {
            handleSearch(searchQuery)
          }
        }}
      />
      <CommandList>
        <CommandEmpty>No products found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {suggestions.map((product) => (
            <CommandItem
              key={product.id}
              onSelect={() => handleSelect(product.id)}
              className="flex items-center gap-2 p-2 cursor-pointer"
            >
              <div className="w-10 h-10 relative rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground truncate">₹{product.price.toFixed(2)}</p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
} 