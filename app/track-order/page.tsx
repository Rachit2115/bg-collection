import { Suspense } from "react"
import TrackOrderContent from "./TrackOrderContent"

export default function TrackOrderPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-serif font-bold mb-6 text-center">Track Your Order</h1>
      <Suspense fallback={<div className="text-center py-10">Loading order tracking...</div>}>
        <TrackOrderContent />
      </Suspense>
    </div>
  )
}
