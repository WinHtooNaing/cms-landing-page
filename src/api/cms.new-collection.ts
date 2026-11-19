import { axiosInstance } from "./axiosInstance"

export type NewCollectionItemContent = {
  productId: string
}

export type NewCollectionItem = {
  id: string
  sectionId: string
  position: number
  content: NewCollectionItemContent
}

export type NewCollectionResponse = {
  data: {
    items: NewCollectionItem[]
  }
}

const collection_section_id = import.meta.env.VITE_COLLECTION
export const getCMSCollection = async () => {
  const response = await axiosInstance.get(
    `/cms/sections/${collection_section_id}`
  )
  return response.data
}
