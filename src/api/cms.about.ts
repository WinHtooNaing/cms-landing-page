import { axiosInstance } from "./axiosInstance"
export interface AboutPageResponse {
  data: {
    sections: AboutSection[]
  }
}

export interface AboutSection {
  key: string
  content: Record<string, string>
  items: {
    content: {
      title?: string
      description?: string
    }
  }[]
}

export const getAboutSection = async () => {
  const response = await axiosInstance.get<AboutPageResponse>(
    "/cms/pages/about-us"
  )
  return response.data
}
