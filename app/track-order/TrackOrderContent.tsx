'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Order } from '@/types/order'
import { getOrder } from '@/lib/orders'
import Image from 'next/image'

export default function TrackOrderContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('No order ID provided')
        setLoading(false)
        return
      }

      try {
        const orderData = await getOrder(orderId)
        setOrder(orderData)
      } catch (err) {
        setError('Failed to fetch order details')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return <div>Loading order details...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <p className="text-gray-600">Order ID: {order.id}</p>
          <p className="text-gray-600">Status: {order.status}</p>
        </div>
        
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <div className="relative w-20 h-20">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <p className="text-lg font-semibold">
            Total: ${order.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
} 