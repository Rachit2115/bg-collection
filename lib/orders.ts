import { Order } from '@/types/order'

export async function getOrder(orderId: string): Promise<Order> {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/orders/${orderId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch order')
  }
  return response.json()
} 