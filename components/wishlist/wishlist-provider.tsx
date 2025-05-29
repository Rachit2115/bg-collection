"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type WishlistItem = {
  id: string
  name: string
  price: number
  images: string[]
}

type WishlistContextType = {
  wishlist: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (itemId: string) => void
  isInWishlist: (itemId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      // Check if the item already exists in the wishlist
      const existingItem = prevWishlist.find((wishlistItem) => wishlistItem.id === item.id)
      if (existingItem) {
        return prevWishlist
      }
      return [...prevWishlist, item]
    })
  }

  const removeFromWishlist = (itemId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== itemId))
  }

  const isInWishlist = (itemId: string) => {
    return wishlist.some((item) => item.id === itemId)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
} 