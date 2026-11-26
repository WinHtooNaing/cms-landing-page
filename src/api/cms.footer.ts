import { axiosInstance } from "./axiosInstance"

export interface FooterItem {
  position: number
  content: {
    name?: string
    url?: string
    pageKey?: string
    destinationType?: "internal" | "external"
    platform?: string
  }
}

export interface FooterSection {
  key: string
  type: string
  position: number
  content: {
    description?: string
  }
  imageUrl: string | null
  items: FooterItem[]
}

export interface FooterPage {
  key: string
  title: string
  seoTitle: string
  seoDescription: string
  ogImageUrl: string | null
  sections: FooterSection[]
}

export interface FooterPageResponse {
  success: boolean
  data: FooterPage
  timestamp: string
  path: string
}

export const getFooterSection = async () => {
  const response = await axiosInstance.get<FooterPageResponse>(
    "/cms/pages/footer"
  )

  return response.data.data
}