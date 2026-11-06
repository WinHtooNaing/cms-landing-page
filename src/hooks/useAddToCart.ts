import { useAuthStore } from "@/store/user-store"
import { useCartStore, type Product } from "@/store/cart-store"
import { useLocation, useNavigate } from "react-router-dom"

export const useAddToCart = () => {
  const user = useAuthStore((state) => state.user)
  const addProduct = useCartStore((state) => state.addToCart)
  const location = useLocation()
  const navigate = useNavigate()

  return (product: Product) => {
    if (user?.role !== "CUSTOMER") {
      navigate("/login", {
        state: {
          from: `${location.pathname}${location.search}${location.hash}`,
        },
      })
      return
    }

    addProduct(product)
  }
}
