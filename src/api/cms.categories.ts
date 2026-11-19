import { axiosInstance } from "./axiosInstance"

export type CategoryItemContent = {
  category: string
}

export type CategoryItem = {
  id: string
  sectionId: string
  position: number
  content: CategoryItemContent
}

export type CategoryResponse = {
  data: {
    items: CategoryItem[]
  }
}

const category_section_id = import.meta.env.VITE_CATEGORY
export const getCMSCategory = async () => {
  const response = await axiosInstance.get(
    `/cms/sections/${category_section_id}`
  )
  return response.data
}
