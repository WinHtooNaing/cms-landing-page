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
const carousel_section_id = "51f6ac36-14e0-448e-894c-448f6d579934"

export const getCarousel = async (): Promise<CarouselResponse> => {
  const { data } = await axiosInstance.get<CarouselResponse>(
    `/cms/sections/${carousel_section_id}`
  )

  return data
}
