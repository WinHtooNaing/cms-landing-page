import { checkCurrentUser } from "@/api/auth"
import { useAuthStore } from "@/store/user-store"
import { useEffect } from "react"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser)
  const setLoading = useAuthStore((state) => state.setLoading)

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem("accessToken")) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        const response = await checkCurrentUser()
        if (!response.success || response.data.role !== "CUSTOMER") {
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          setUser(null)
          return
        }

        const { id, name, email, phone, role } = response.data
        setUser({ id, name, email, phone, role })
      } catch (error) {
        console.error("Failed to restore the current user session", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    void getCurrentUser()
  }, [setLoading, setUser])

  return <>{children}</>
}
export default AuthProvider
