export interface Order {
  id: string
  status: string
  total: number
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
} 