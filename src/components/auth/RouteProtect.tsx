import { useAuthStore } from "@/store/user-store"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const RouteProtect = () => {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const location = useLocation()

  if (isLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        role="status"
      >
        Checking your session...
      </div>
    )
  }

  if (user?.role !== "CUSTOMER") {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
        }}
      />
    )
  }

  return <Outlet />
}

export default RouteProtect
