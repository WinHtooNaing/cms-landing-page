import { axiosInstance } from "./axiosInstance"
export interface SiteSettingsSection {
  key: string
  type: string
  position: number
  content: {
    alt?: string
  }
  imageUrl: string | null
  items: unknown[]
}

export interface SiteSettingsResponse {
  success: boolean
  data: {
    key: string
    title: string
    seoTitle: string
    seoDescription: string
    ogImageUrl: string | null
    sections: SiteSettingsSection[]
  }
}

export const getLogoSection = async () => {
  const response = await axiosInstance.get<SiteSettingsResponse>(
    "/cms/pages/site-settings"
  )
  return response.data
}
