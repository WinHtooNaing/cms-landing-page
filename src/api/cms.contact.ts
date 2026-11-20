import { axiosInstance } from "./axiosInstance"
export interface ContactPageResponse {
  data: {
    sections: ContactSection[]
  }
}

export interface ContactSection {
  key: string
  content: {
    email: string
    phone: string
    address: string
    emailTitle: string
    phoneTitle: string
    closingTime: string
    openingTime: string
    workingDays: []
    addressTitle: string
    emailDescription: string

    phoneDescription: string
    addressDescription: string
    businessHoursTitle: string
    businessHoursDescription: string
  }
}

export const getContactSection = async () => {
  const response = await axiosInstance.get<ContactPageResponse>(
    "/cms/pages/contact-us"
  )
  return response.data
}
