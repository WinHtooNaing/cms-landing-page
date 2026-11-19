import { axiosInstance } from "./axiosInstance"

export type getCategoryProps = {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  imagePublicId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
export type categoryResponseProps = {
  data: getCategoryProps[]
}

export const getCategories = async () => {
  const response = await axiosInstance.get<categoryResponseProps>("/categories")
  return response.data
}
