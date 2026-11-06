import axios, { type InternalAxiosRequestConfig } from "axios"

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

const baseURL = import.meta.env.VITE_API_URL
const refreshEndpoint = "/auth/refresh"

export const axiosInstance = axios.create({ baseURL })

// to prevent multiple refresh requests
let refreshPromise: Promise<string> | null = null

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken")
  if (!refreshToken) {
    throw new Error("No refresh token is available")
  }

  const response = await axios.post<{
    data?: { accessToken?: string; refreshToken?: string }
  }>(refreshEndpoint, { refreshToken }, { baseURL })

  const accessToken = response.data.data?.accessToken
  if (!accessToken) {
    throw new Error("The refresh response did not include an access token")
  }

  localStorage.setItem("accessToken", accessToken)
  const rotatedRefreshToken = response.data.data?.refreshToken
  if (rotatedRefreshToken) {
    localStorage.setItem("refreshToken", rotatedRefreshToken)
  }

  return accessToken
}

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  } else {
    delete config.headers.Authorization
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    const config = error.config as InternalAxiosRequestConfig | undefined
    if (
      error.response?.status !== 401 ||
      !config ||
      config._retry ||
      config.url?.includes("/auth/login") ||
      config.url?.includes(refreshEndpoint)
    ) {
      return Promise.reject(error)
    }

    config._retry = true

    try {
      refreshPromise ??= refreshAccessToken()
      const accessToken = await refreshPromise
      config.headers.Authorization = `Bearer ${accessToken}`
      return axiosInstance(config)
    } catch (refreshError) {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      if (window.location.pathname !== "/login") {
        window.location.assign("/login")
      }
      return Promise.reject(refreshError)
    } finally {
      refreshPromise = null
    }
  }
)
