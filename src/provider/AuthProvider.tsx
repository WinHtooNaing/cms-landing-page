import { checkCurrentUser } from "@/api/auth"
import { useAuthStore } from "@/store/user-store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)
  const getCurrentUser = async () => {
    try {
      const response = await checkCurrentUser()
      if (response.success) {
        if (response.data.role !== "CUSTOMER") {
          throw new Error("Something went wrong")
        } else {
          const { id, name, email, phone, role } = response.data
          setUser({
            id,
            name,
            email,
            phone,
            role,
          })
        }
      } else {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        setUser(null)
        navigate("/")
        throw new Error(response.message)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getCurrentUser()
  }, [])
  return <>{children}</>
}
export default AuthProvider
