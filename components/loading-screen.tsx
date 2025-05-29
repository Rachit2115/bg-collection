"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Sparkles } from "lucide-react"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center relative">
        {/* Elegant animated background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Animated circles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full border border-primary/20"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.2, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Animated dots */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute rounded-full bg-secondary/30 dark:bg-secondary/20"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [Math.random() * 100, Math.random() * -100],
                x: [Math.random() * 100, Math.random() * -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="loading-logo mb-8 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Elegant logo animation */}
          <div className="flex flex-col items-center justify-center mb-4">
            <motion.div
              className="relative"
              animate={{
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-white" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-8 w-8 text-secondary" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-primary">BG Collection</h1>
            <p className="text-lg text-muted-foreground mt-2 font-inter">Premium Home Decor & Gifts</p>
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Elegant progress bar */}
          <div className="w-64 h-1 bg-muted rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: "100%",
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                backgroundPosition: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            />
          </div>

          <motion.p
            className="mt-6 text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Curating elegance for your home...
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
