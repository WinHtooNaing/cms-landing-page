import { axiosInstance } from "./axiosInstance"

export type productProps = {
  data: {
    items: newCollectionProps[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }
}
export type productDetailProps = {
  data: newCollectionProps
}
export type newCollectionProps = {
  id: number
  categoryId: number
  name: string
  description: string
  price: number
  imageUrl: string
  isActive: boolean
}

export const newCollection = async () => {
  const response = await axiosInstance.get<productProps>(
    "/products?page=1&limit=8&sortOrder=desc"
  )
  return response.data
}

export const getProductDetail = async (id: number) => {
  const response = await axiosInstance.get<productDetailProps>(
    `/products/${id}`
  )
  return response.data
}
export const getAllProducts = async (
  page: number,
  limit: number,
  sortOrder: string
  // categoryId?: number | null
) => {
  const response = await axiosInstance.get<productProps>(
    `/products?page=${page}&limit=${limit}&sortOrder=${sortOrder}`
  )
  return response.data
}
