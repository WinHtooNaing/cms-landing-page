import { axiosInstance } from "./axiosInstance"

export type CarouselItemContent = {
  title: string
  description: string
  imageUrl: string
  imagePublicId?: string
}

export type CarouselItem = {
  id: string
  sectionId: string
  position: number
  content: CarouselItemContent
}

export type CarouselResponse = {
  data: {
    items: CarouselItem[]
  }
}
const carousel_section_id = import.meta.env.VITE_IMAGE_CAROUSEL

export const getCarousel = async (): Promise<CarouselResponse> => {
  const { data } = await axiosInstance.get<CarouselResponse>(
    `/cms/sections/${carousel_section_id}`
  )

  return data
}
