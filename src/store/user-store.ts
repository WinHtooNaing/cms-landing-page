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
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthProps>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => {
    set({
      user,
    })
  },
  setLoading: (isLoading) => set({ isLoading }),
}))
