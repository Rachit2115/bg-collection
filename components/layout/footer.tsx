"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Heart, ArrowUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { categories } from "@/lib/data"
import { motion } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-muted/30 border-t relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5 dark:bg-primary/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [Math.random() * 50, Math.random() * -50],
              x: [Math.random() * 50, Math.random() * -50],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Scroll to top button */}
      <div className="container mx-auto relative">
        <motion.div className="absolute right-4 top-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={scrollToTop}
            className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover-glow"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="text-xl font-poppins font-bold flex items-center">
                <span className="mr-1">BG</span>
                <Sparkles className="h-4 w-4 text-secondary" />
                <span className="ml-1">Collection</span>
              </Link>
            </motion.div>
            <p className="mt-4 text-muted-foreground font-inter">
              Premium home decor and gift items for every occasion.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialButton icon={<Facebook className="h-5 w-5" />} label="Facebook" />
              <SocialButton icon={<Instagram className="h-5 w-5" />} label="Instagram" />
              <SocialButton icon={<Twitter className="h-5 w-5" />} label="Twitter" />
              <SocialButton icon={<Youtube className="h-5 w-5" />} label="YouTube" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider font-poppins">Shop</h3>
            <ul className="mt-4 space-y-2 font-inter">
              <li>
                <FooterLink href="/products">All Products</FooterLink>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <FooterLink href={`/products?category=${category.id}`}>{category.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider font-poppins">Company</h3>
            <ul className="mt-4 space-y-2 font-inter">
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider font-poppins">Customer Service</h3>
            <ul className="mt-4 space-y-2 font-inter">
              <li>
                <FooterLink href="/faq">FAQ</FooterLink>
              </li>
              <li>
                <FooterLink href="/shipping">Shipping & Returns</FooterLink>
              </li>
              <li>
                <FooterLink href="/warranty">Warranty</FooterLink>
              </li>
              <li>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms">Terms & Conditions</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <p className="text-sm text-muted-foreground font-inter">
                &copy; {new Date().getFullYear()} BG Collection. All rights reserved. Made with{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block text-secondary"
                >
                  <Heart className="h-3 w-3 inline" fill="currentColor" />
                </motion.span>{" "}
                by <b>Rachit Bhushan Sharma</b>
              </p>
              <p className="text-sm text-muted-foreground font-inter mt-2">
                Contact:{" "}
                <a href="mailto:rachit2115cool@gmail.com" className="hover:text-primary transition-colors">
                  rachit2115cool@gmail.com
                </a>
              </p>
            </div>

            <div className="order-1 md:order-2">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Input
                    type="email"
                    placeholder="Join our newsletter..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 pl-4 pr-4 rounded-full border-primary/20 focus:border-primary keyboard-focus"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full btn-ripple"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {/* Removed payment method images */}
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground py-4">
        <b>This is a sample website made by <b>Rachit</b>.</b>
      </div>
    </footer>
  )
}

// Social media button with animation
function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button variant="ghost" size="icon" className="rounded-full hover-glow">
        {icon}
        <span className="sr-only">{label}</span>
      </Button>
    </motion.div>
  )
}

// Footer link with hover animation
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-muted-foreground hover:text-primary transition-colors relative group">
      <span>{children}</span>
      <motion.span
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary opacity-0 group-hover:opacity-100"
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}
