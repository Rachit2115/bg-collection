"use client"

import { motion } from "framer-motion"
import { termsConditionsData } from "@/lib/data"

export default function TermsConditionsPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-2">{termsConditionsData.title}</h1>
          <p className="text-muted-foreground text-center mb-8">
            Please read these terms carefully before using our website and services.
          </p>
        </motion.div>

        <div className="bg-muted/30 rounded-lg p-6 md:p-8">
          <div className="prose max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: termsConditionsData.content }} />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Last updated: May 1, 2023</p>
          <p>By using our website, you agree to these terms and conditions.</p>
        </div>
      </div>
    </div>
  )
}
