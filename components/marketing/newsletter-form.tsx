"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"

export function NewsletterForm() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsLoading(false)
      setIsSubmitted(true)

      // Reset submitted state after a while
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1000)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md mx-auto flex-col sm:flex-row gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 pl-4 pr-4 rounded-full keyboard-focus"
          disabled={isLoading || isSubmitted}
        />
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          disabled={isLoading || isSubmitted}
          className="bg-white text-primary hover:bg-white/90 rounded-full h-12 px-6 btn-ripple"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Send className="h-5 w-5" />
            </motion.div>
          ) : isSubmitted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <CheckCircle className="h-5 w-5" />
            </motion.div>
          ) : (
            "Subscribe"
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}
