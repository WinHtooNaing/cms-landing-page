import { axiosInstance } from "./axiosInstance"

export type createAddToCartProps = {
  productId: number
  quantity: number
}
export type getAddToCartItemsProps = {
  productId: number
  name: string
  slug: string
  imageUrl: string
  isActive: boolean
  quantity: 2
  currentUnitPrice: number
  lineSubtotal: number
}
export type getAddToCart = {
  data: {
    items: getAddToCartItemsProps[]
    subtotal: number
  }
}
export const createAddToCart = async (payload: createAddToCartProps) => {
  const response = await axiosInstance.post("/cart/items", payload)
  return response.data
}

export const getAddToCartItems = async () => {
  const response = await axiosInstance.get<getAddToCart>("/cart")
  return response.data
}
export const deleteAddToCart = async () => {
  const response = await axiosInstance.delete("/cart")
  return response.data
}
export const deleteAddToCartById = async (id: number) => {
  const response = await axiosInstance.delete(`/cart/items/${id}`)
  return response.data
}
export const updateQuantity = async (payload: createAddToCartProps) => {
  const response = await axiosInstance.patch(
    `/cart/items/${payload.productId}`,
    {
      quantity: payload.quantity,
    }
  )
  return response.data
}
