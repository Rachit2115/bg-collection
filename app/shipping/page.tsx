"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { shippingReturnsData } from "@/lib/data"

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-2">Shipping & Returns</h1>
          <p className="text-muted-foreground text-center mb-8">
            Information about our shipping process and return policies.
          </p>
        </motion.div>

        <Tabs defaultValue="shipping" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="shipping" className="mt-6">
            <div className="prose max-w-none dark:prose-invert">
              <h2 className="text-2xl font-serif font-bold mb-4">{shippingReturnsData.shipping.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: shippingReturnsData.shipping.content }} />
            </div>
          </TabsContent>
          <TabsContent value="returns" className="mt-6">
            <div className="prose max-w-none dark:prose-invert">
              <h2 className="text-2xl font-serif font-bold mb-4">{shippingReturnsData.returns.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: shippingReturnsData.returns.content }} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
