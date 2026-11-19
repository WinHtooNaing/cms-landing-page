import { axiosInstance } from "./axiosInstance"

export type ProfileProps = {
  id: string
  name: string
  email: string
  phone: string
}
export type ProfileResponse = {
  data: ProfileProps
}
export const getProfile = async () => {
  const response = await axiosInstance.get<ProfileResponse>("/users/me")
  return response.data
}

export type ProfileUpdate = Pick<ProfileProps, "name" | "phone">

export const updateProfile = async (data: ProfileUpdate) => {
  const response = await axiosInstance.patch<ProfileProps>(`/users/me`, data)
  return response.data
}
