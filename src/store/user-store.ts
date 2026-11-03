import { create } from "zustand"

export type User = {
  id: number
  name: string
  email: string
  phone: string
  role: string
}
export interface AuthProps {
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthProps>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) => {
    set({
      user,
    })
  },
}))
