"use client"

import { useState, useEffect, ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Menu, Search, ShoppingBag, User, X, ChevronDown, LogOut, Sparkles, Package, Truck, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useCart } from "@/components/cart/cart-provider"
import { useAuth } from "@/components/auth/auth-provider"
import { categories } from "@/lib/data"
import Image from "next/image"
import { SearchSuggestions } from "@/components/search/search-suggestions"

export function Header() {
  const pathname = usePathname()
  const { cart, updateQuantity, removeFromCart } = useCart()
  const { user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [cartBounce, setCartBounce] = useState(false)

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Check if a link is active
  const isLinkActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsCartOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // Animate cart icon when items are added
  useEffect(() => {
    if (cart.length > 0) {
      setCartBounce(true)
      const timer = setTimeout(() => setCartBounce(false), 800)
      return () => clearTimeout(timer)
    }
  }, [cart.length])

  const headerVariants = {
    visible: {
      backgroundColor: isScrolled ? "rgba(var(--background), 0.9)" : "rgba(var(--background), 0)",
      backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
      borderBottom: isScrolled ? "1px solid rgba(var(--border), 0.1)" : "1px solid rgba(var(--border), 0)",
      boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "none",
    },
  }

  return (
    <motion.header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      variants={headerVariants}
      animate="visible"
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Trigger */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden keyboard-focus hover-glow"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-primary" />
            </Button>
          </motion.div>

          {/* Logo */}
          <Link href="/" className="flex items-center keyboard-focus group" aria-label="BG Collection Home">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-xl font-poppins font-bold mr-1">BG</span>
              <motion.span
                className="relative"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Sparkles className="h-5 w-5 text-secondary" />
              </motion.span>
              <span className="text-xl font-poppins font-bold ml-1">Collection</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" isActive={isLinkActive("/")}>
              Home
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium transition-colors hover:text-primary keyboard-focus relative group ${
                    isLinkActive("/products") ? "text-primary font-semibold" : "text-foreground/70"
                  } p-0 h-auto`}
                >
                  <span className="flex items-center">
                    Shop <ChevronDown className="h-4 w-4 ml-1" />
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
                    animate={{ width: isLinkActive("/products") ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary opacity-0 group-hover:opacity-100"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-card/95 backdrop-blur-md relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/shop2.jpg"
                    alt="Shop Background"
                    fill
                    className="object-cover opacity-20"
                    priority
                  />
                </div>
                <div className="relative z-10 bg-background/50 backdrop-blur-sm">
                  <DropdownMenuItem asChild>
                    <Link href="/products" className="w-full cursor-pointer keyboard-focus hover:bg-primary/10">
                      All Products
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link
                        href={`/products?category=${category.id}`}
                        className={`w-full cursor-pointer keyboard-focus hover:bg-primary/10 ${
                          pathname.includes(`category=${category.id}`) ? "text-primary font-semibold" : ""
                        }`}
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/about" isActive={isLinkActive("/about")}>
              About
            </NavLink>

            <NavLink href="/contact" isActive={isLinkActive("/contact")}>
              Contact
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex keyboard-focus hover-glow"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-primary" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ThemeToggle />
            </motion.div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full keyboard-focus hover-glow"
                      aria-label="User menu"
                    >
                      <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarImage src={user.profileImage || ""} alt={user.name} />
                        <AvatarFallback className="bg-primary/20 text-primary font-medium">
                          {user.firstName?.charAt(0) || user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer keyboard-focus hover:bg-primary/10">
                      <User className="mr-2 h-4 w-4 text-primary" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer keyboard-focus hover:bg-primary/10">
                      <ShoppingBag className="mr-2 h-4 w-4 text-primary" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist" className="cursor-pointer keyboard-focus hover:bg-primary/10">
                      <Heart className="mr-2 h-4 w-4 text-primary" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer keyboard-focus hover:bg-primary/10">
                    <LogOut className="mr-2 h-4 w-4 text-primary" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" asChild className="keyboard-focus hover-glow">
                  <Link href="/auth/login" aria-label="Sign in">
                    <User className="h-5 w-5 text-primary" />
                  </Link>
                </Button>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={cartBounce ? { y: [0, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative keyboard-focus hover-glow"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <ShoppingBag className="h-5 w-5 text-primary" />
                {cartItemsCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t overflow-hidden bg-card/80 backdrop-blur-md"
          >
            <div className="container mx-auto py-4">
              <div className="relative max-w-2xl mx-auto">
                <SearchSuggestions isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center keyboard-focus group" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="text-xl font-poppins font-bold mr-1">BG</span>
                    <motion.span
                      className="relative"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Sparkles className="h-5 w-5 text-secondary" />
                    </motion.span>
                    <span className="text-xl font-poppins font-bold ml-1">Collection</span>
                  </motion.div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="keyboard-focus hover-glow"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-primary" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <nav className="flex flex-col p-4">
                <Link
                  href="/"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md keyboard-focus hover:bg-primary/10 ${
                    isLinkActive("/") ? "text-primary font-semibold" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  href="/products"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md keyboard-focus hover:bg-primary/10 ${
                    isLinkActive("/products") ? "text-primary font-semibold" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>

                <Link
                  href="/about"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md keyboard-focus hover:bg-primary/10 ${
                    isLinkActive("/about") ? "text-primary font-semibold" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md keyboard-focus hover:bg-primary/10 ${
                    isLinkActive("/contact") ? "text-primary font-semibold" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>

            <div className="py-4 border-t">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar className="h-8 w-8 border-2 border-primary">
                      <AvatarImage src={user.profileImage || ""} alt={user.name} />
                      <AvatarFallback className="bg-primary/20 text-primary font-medium">
                        {user.firstName?.charAt(0) || user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium font-poppins">{user.name}</p>
                      <p className="text-xs text-muted-foreground font-inter">{user.email}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/profile"
                        className={`flex items-center py-2 px-3 rounded-md hover:bg-primary/10 keyboard-focus ${
                          isLinkActive("/profile") ? "text-primary font-semibold" : ""
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4 text-primary" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/wishlist"
                        className={`flex items-center py-2 px-3 rounded-md hover:bg-primary/10 keyboard-focus ${
                          isLinkActive("/wishlist") ? "text-primary font-semibold" : ""
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Heart className="mr-2 h-4 w-4 text-primary" />
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <button
                        className="flex w-full items-center py-2 px-3 rounded-md hover:bg-primary/10 text-left keyboard-focus"
                        onClick={() => {
                          logout()
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4 text-primary" />
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-3">
                  <Button asChild className="keyboard-focus btn-ripple bg-primary hover:bg-primary/90">
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="keyboard-focus btn-ripple border-primary text-primary hover:bg-primary/10"
                  >
                    <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                      Create Account
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Cart Sidebar */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-card/95 backdrop-blur-md">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between py-4 border-b">
              <h2 className="text-lg font-poppins font-semibold">Your Cart ({cartItemsCount})</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
                className="keyboard-focus hover-glow"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 text-primary" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto py-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <ShoppingBag className="h-16 w-16 text-primary/50 mb-4" />
                  </motion.div>
                  <h3 className="text-lg font-poppins font-medium mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6 font-inter">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <Button
                    asChild
                    onClick={() => setIsCartOpen(false)}
                    className="keyboard-focus btn-ripple bg-primary hover:bg-primary/90"
                  >
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 card-hover p-3 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Link href={`/products/${item.id}`} onClick={() => setIsCartOpen(false)}>
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </Link>
                      </div>

                      <div className="flex-1">
                        <Link
                          href={`/products/${item.id}`}
                          className="font-medium hover:text-primary transition-colors keyboard-focus font-poppins"
                          onClick={() => setIsCartOpen(false)}
                        >
                          {item.name}
                        </Link>

                        <div className="text-sm text-muted-foreground mt-1 font-inter">
                          <span className="capitalize">Color: {item.selectedColor}</span> / Size: {item.selectedSize}
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-primary/20 rounded-md overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                              className="flex-1 h-8 w-8 flex items-center justify-center keyboard-focus hover:bg-primary/10"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="flex-1 h-8 w-8 flex items-center justify-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item, item.quantity + 1)}
                              className="flex-1 h-8 w-8 flex items-center justify-center keyboard-focus hover:bg-primary/10"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="font-medium text-primary">{formatPrice(item.price * item.quantity)}</div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 keyboard-focus hover:bg-primary/10 text-primary"
                              onClick={() => removeFromCart(item)}
                              aria-label="Remove item"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t py-4">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-inter">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-primary">
                      {formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-inter">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between font-medium font-poppins">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0))}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      onClick={() => setIsCartOpen(false)}
                      className="keyboard-focus btn-ripple bg-primary hover:bg-primary/90"
                    >
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      onClick={() => setIsCartOpen(false)}
                      className="keyboard-focus btn-ripple border-primary text-primary hover:bg-primary/10"
                    >
                      <Link href="/cart">View Cart</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  )
}

// Custom NavLink component with animations
function NavLink({ href, isActive, children }: { href: string; isActive: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-primary keyboard-focus relative group ${
        isActive ? "text-primary font-semibold" : "text-foreground/70"
      }`}
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary opacity-0 group-hover:opacity-100"
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}
