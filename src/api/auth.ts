import { axiosInstance } from "./axiosInstance"
export type registerProps = {
  name: string
  email: string
  password: string
  phone: string
}
export type loginProps = {
  email: string
  password: string
}

export const register = async (payload: registerProps) => {
  try {
    const response = await axiosInstance.post("/auth/register", payload, {
      validateStatus: () => true,
    })
    return response.data
  } catch (error: any) {
    return error.message
  }
}

export const login = async (payload: loginProps) => {
  try {
    const response = await axiosInstance.post("/auth/login", payload, {
      validateStatus: () => true,
    })
    return response.data
  } catch (error: any) {
    return error.message
  }
}

export const checkCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me")
  return response.data
}
