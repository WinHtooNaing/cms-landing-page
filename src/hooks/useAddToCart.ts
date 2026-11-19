import { createAddToCart } from "@/api/addToCart"
import { useAuthStore } from "@/store/user-store"
import { useQueryClient } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export type Product = {
  id: string | number
}

export const useAddToCart = () => {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  const location = useLocation()
  const navigate = useNavigate()

  return async (product: Product) => {
    if (user?.role !== "CUSTOMER") {
      navigate("/login", {
        state: {
          from: `${location.pathname}${location.search}${location.hash}`,
        },
      })
      return
    }

    try {
      const response = await createAddToCart({
        productId: String(product.id),
        quantity: 1,
      })
      if (!response.success) {
        throw new Error(response.message ?? "Could not add product to cart.")
      }

      toast.success("Product added to cart.", { position: "bottom-right" })
      await queryClient.invalidateQueries({ queryKey: ["addToCart"] })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not add product to cart."
      )
    }
  }
}
