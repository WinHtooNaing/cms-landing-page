import { axiosInstance } from "./axiosInstance"
export interface HomePageResponse {
  data: {
    sections: HomeSection[]
  }
}

export interface HomeSection {
  key: string
  items: {
    content: {
      title?: string
      imageUrl?: string
      description?: string
      productId?: string
      category?: string
    }
  }[]
}

export const getHomeSection = async () => {
  const response = await axiosInstance.get<HomePageResponse>("/cms/pages/home")
  return response.data
}
