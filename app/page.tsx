"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { ArrowRight, ShoppingBag, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"
import { NewsletterForm } from "@/components/marketing/newsletter-form"
import { featuredProducts, categories } from "@/lib/data"

export default function HomePage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])

  // For scroll animations
  const controls = useAnimation()

  // Set up intersection observer for animations
  useEffect(() => {
    // Get all elements with animation classes
    const elements = document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe all elements
    elements.forEach((element) => {
      observer.observe(element)
    })

    // Cleanup function
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, []) // Empty dependency array to run only once

  return (
    <div className="flex flex-col">
      {/* Hero Section with Parallax */}
      <section ref={ref} className="relative h-[90vh] w-full overflow-hidden parallax">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 parallax-bg">
          <Image src="/images/hero-background.jpeg" alt="BG Collection Hero" fill priority className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10" />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold mb-6"
          >
            Redefine Your Style
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mb-8 font-inter"
          >
            Discover the latest collection of premium fashion and lifestyle products
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 btn-ripple">
              <Link href="/products">
                Shop Now <ShoppingBag className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [Math.random() * 50, Math.random() * -50],
                  x: [Math.random() * 50, Math.random() * -50],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-6 w-6 text-primary/70" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center mb-12 fade-in-up">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-80 overflow-hidden rounded-lg card-hover"
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 group-hover:from-black/80 group-hover:to-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <motion.h3
                    className="text-2xl font-poppins font-bold mb-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {category.name}
                  </motion.h3>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-black btn-ripple"
                    >
                      <Link href={`/products?category=${category.id}`}>Explore</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold fade-in-left">Featured Products</h2>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="fade-in-right"
            >
              <Button variant="link" asChild className="text-primary group">
                <Link href="/products" className="flex items-center">
                  View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="fade-in-left"
            >
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6 font-inter">
                BG Collection was founded with a vision to create premium fashion that combines timeless elegance with
                modern aesthetics. Our commitment to quality and sustainability drives everything we do.
              </p>
              <p className="text-lg text-muted-foreground mb-8 font-inter">
                Each piece in our collection is carefully crafted using the finest materials, ensuring both luxury and
                longevity. We believe that true style is sustainable.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 btn-ripple"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-lg overflow-hidden fade-in-right"
            >
              <Image
                src="/placeholder.svg?height=1000&width=800"
                alt="BG Collection Story"
                fill
                className="object-cover"
              />

              {/* Decorative elements */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Star className="h-10 w-10 text-secondary" fill="currentColor" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 100 + 20,
                height: Math.random() * 100 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [Math.random() * 100, Math.random() * -100],
                x: [Math.random() * 100, Math.random() * -100],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Join Our Community</h2>
              <p className="text-lg mb-8 font-inter">
                Subscribe to our newsletter to receive updates on new collections, exclusive offers, and styling tips.
              </p>
              <NewsletterForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
