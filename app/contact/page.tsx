"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormStatus("idle")

    try {
      const formData = new FormData(event.currentTarget)

      // Send form data to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormStatus("success")
        toast({
          title: "Message Sent",
          description: "Thank you for contacting us! We'll get back to you shortly.",
        })
        // Reset form
        event.currentTarget.reset()
      } else {
        setFormStatus("error")
        toast({
          title: "Error",
          description: data.message || "Failed to send your message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setFormStatus("error")
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help. Reach out to us using any of the methods
            below.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Card className="transition-all duration-300 hover:shadow-lg border-primary/10 hover:border-primary/30">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-medium">+91 98765 43210</p>
                <p className="text-muted-foreground mt-1">Mon-Sat: 10AM - 7PM</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="transition-all duration-300 hover:shadow-lg border-primary/10 hover:border-primary/30">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-medium">rachit2115cool@gmail.com</p>
                <p className="text-muted-foreground mt-1">We'll respond within 24 hours</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="transition-all duration-300 hover:shadow-lg border-primary/10 hover:border-primary/30">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-medium">1st Floor, Tamanna Palace</p>
                <p className="text-muted-foreground mt-1">Near Mankameshwar Mandir, Rawatpara-282003</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden Web3Forms access key */}
                  <input type="hidden" name="access_key" value="d438427d-894e-41ec-8ae2-18caa7a54c06" />
                  <input type="hidden" name="subject" value="New Contact Form Submission - BG Collection" />
                  <input type="hidden" name="from_name" value="BG Collection Contact Form" />
                  <input type="hidden" name="redirect" value="false" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        minLength={2}
                        className="transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        className="transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Your phone number"
                        required
                        minLength={10}
                        className="transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Message subject"
                        required
                        minLength={5}
                        className="transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      className="min-h-[150px] transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                      minLength={10}
                    />
                  </div>

                  <Button type="submit" className="w-full relative overflow-hidden group" disabled={isSubmitting}>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out -z-10"></span>
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  {formStatus === "success" && (
                    <motion.div
                      className="text-green-600 text-center mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Your message has been sent successfully!
                    </motion.div>
                  )}

                  {formStatus === "error" && (
                    <motion.div
                      className="text-red-600 text-center mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      There was an error sending your message. Please try again.
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="flex flex-col gap-6" variants={itemVariants}>
            <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <CardTitle>Store Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>11:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 border-primary/10 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.4024439564774!2d78.0092903!3d27.1750151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121d702ff6d%3A0xdd2ae4803f767dde!2sTamanna%20Palace%2C%20Mankameshwar%20Temple%2C%20Rawatpara%2C%20Agra%2C%20Uttar%20Pradesh%20282003!5e0!3m2!1sen!2sin!4v1653651111148!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BG Collection Store Location"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
