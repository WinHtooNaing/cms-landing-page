import { useParams, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import {
  ShoppingCart,
  Star,
  Package,
  CheckCircle2,
  AlertCircle,
  Tag,
  ArrowLeft,
} from "lucide-react"
import { cn } from "../lib/utils"
import RelatedProduct from "@/components/RelatedProduct"
import { motion } from "motion/react"
import { getProductDetail } from "@/api/products"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton"
import {
  createAddToCart,
  type createAddToCartProps,
} from "@/api/addToCart"
import { toast } from "sonner"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/user-store"
const ProductDetails = () => {
  const { id } = useParams()
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // Add to Cart
  const addToCart = async (payload: createAddToCartProps) => {
    setLoading(true)
    try {
      const response = await createAddToCart(payload)

      if (response.success) {
        toast.success("Product added to cart", {
          position: "bottom-right",
        })

        await queryClient.invalidateQueries({
          queryKey: ["addToCart"],
        })
      } else {
        throw new Error("Unable to add product to cart")
      }
    } catch (err) {
      toast.error("Something went wrong")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch Product Details
  const getDetail = async () => {
    const response = await getProductDetail(id || "")
    return response.data
  }

  const { isError, isLoading, data , isFetching } = useQuery({
    queryKey: ["product", Number(id)],
    queryFn: getDetail,
    enabled: !!id,
  })

  // Error State
  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-500">
          Something went wrong. Please try again.
        </p>
      </div>
    )
  }

  // Loading State
  if (isLoading || isFetching) return <ProductDetailsSkeleton />

  // Not Found State
  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Product Not Found</h1>

        <p className="text-gray-500">
          Sorry, the product you are looking for does not exist.
        </p>

        <Button>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  // Product Information
  const availableStock = data.stock?.availableQuantity ?? 0
  const isOutOfStock = availableStock <= 0

  const discount = Number(data.discountPercentage) || 0
  const originalPrice = Number(data.originalPrice) || 0
  const currentPrice = Number(data.price) || 0

  const hasDiscount =
    discount > 0 && originalPrice > currentPrice

  const stockStatus =
    availableStock <= 0
      ? "out"
      : availableStock <= 5
        ? "low"
        : "available"

  return (
    <div className="container relative mx-auto px-4 pt-25 pb-12">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute top-20 left-10 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute top-60 right-10 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Back Button */}
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      {/* Main Product Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <CardContent className="grid grid-cols-1 gap-8 p-4 sm:p-6 md:grid-cols-2 md:gap-12 md:p-10">

            {/* ================= PRODUCT IMAGE ================= */}
            <div className="relative">
              <div
                className={cn(
                  "group relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl border border-slate-100 p-6 sm:p-8 md:min-h-[500px]",
                  "bg-gradient-to-br from-slate-50 via-white to-blue-50",
                )}
              >
                {/* Decorative Glow */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-3xl transition-all duration-500 group-hover:bg-blue-200/60" />

                {/* Subtle Background Circle */}
                <div className="pointer-events-none absolute h-[75%] w-[75%] rounded-full border border-slate-200/50" />

                {/* Product Image */}
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className={cn(
                    "relative z-10 max-h-[320px] w-full object-contain sm:max-h-[380px] md:max-h-[420px]",
                    "transition-transform duration-700 ease-out",
                    !isOutOfStock && "group-hover:scale-105",
                    isOutOfStock && "opacity-80 ",
                  )}
                />

                {/* Discount Badge */}
                {hasDiscount && (
                  <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-sm font-bold text-white shadow-lg shadow-rose-500/20 sm:left-5 sm:top-5">
                    <Tag className="h-4 w-4" />
                    {Math.floor(discount)}% OFF
                  </div>
                )}

                {/* Stock Badge */}
                <div
                  className={cn(
                    "absolute right-4 top-4 z-20 rounded-xl px-3 py-2 text-xs font-bold sm:right-5 sm:top-5",
                    stockStatus === "out" &&
                      "bg-red-100 text-red-700",
                    stockStatus === "low" &&
                      "bg-amber-100 text-amber-700",
                    stockStatus === "available" &&
                      "bg-emerald-100 text-emerald-700",
                  )}
                >
                  {stockStatus === "out"
                    ? ""
                    : stockStatus === "low"
                      ? "LOW STOCK"
                      : "IN STOCK"}
                </div>

                {/* Out of Stock Overlay */}
                 {/* {isOutOfStock && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/30 backdrop-blur-[2px]">
                    <span className="rounded-xl bg-red-600 px-7 py-3 text-lg font-bold tracking-widest text-white shadow-xl shadow-red-500/20">
                      SOLD OUT
                    </span>
                    <img src={SoldOut} alt="Out of Stock" className="h-20 w-20" />
                  </div>
                )}  */}
{isOutOfStock && (
  <div className="absolute inset-0 z-20 overflow-hidden">
    <div className="absolute -right-12 top-8 rotate-45 bg-red-600 px-16 py-3 text-sm font-bold tracking-widest text-white shadow-lg">
      OUT OF STOCK
    </div>
  </div>
)}
                {/* Image Bottom Decoration */}
                <div className="pointer-events-none absolute bottom-5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-slate-200" />
              </div>

            </div>

            {/* ================= PRODUCT INFORMATION ================= */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col justify-center py-2"
            >
              {/* Category Label */}
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Product Details
              </p>

              {/* Product Name */}
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
                {data.name}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <span className="text-sm font-medium text-slate-500">
                  4.5 / 5.0
                </span>
              </div>

              {/* ================= PRICE ================= */}
              <div className="mt-7 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                    {currentPrice.toLocaleString()} Ks
                  </span>

                  {hasDiscount && (
                    <span className="text-lg text-slate-400 line-through">
                      {originalPrice.toLocaleString()} Ks
                    </span>
                  )}
                </div>

                {/* Discount Information */}
                {hasDiscount && (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-primary">
                    <Tag className="h-4 w-4" />

                    You save{" "}
                    {(originalPrice - currentPrice).toLocaleString()} Ks
                    ({Math.floor(discount)}% off)
                  </div>
                )}
              </div>

              {/* ================= STOCK INFORMATION ================= */}
              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                {/* Stock Icon */}
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    stockStatus === "out" &&
                      "bg-red-50 text-red-600",
                    stockStatus === "low" &&
                      "bg-amber-50 text-amber-600",
                    stockStatus === "available" &&
                      "bg-emerald-50 text-emerald-600",
                  )}
                >
                  {stockStatus === "out" ? (
                    <AlertCircle className="h-5 w-5" />
                  ) : (
                    <Package className="h-5 w-5" />
                  )}
                </div>

                {/* Stock Text */}
                <div className="flex-1">
                  <p className="text-sm text-slate-500">
                    Product Availability
                  </p>

                  <p
                    className={cn(
                      "mt-1 font-bold",
                      stockStatus === "out" &&
                        "text-red-600",
                      stockStatus === "low" &&
                        "text-amber-600",
                      stockStatus === "available" &&
                        "text-emerald-600",
                    )}
                  >
                    {isOutOfStock
                      ? "Currently unavailable"
                      : `${availableStock} items available`}
                  </p>
                </div>

                {/* Stock Status Icon */}
                {!isOutOfStock && (
                  <CheckCircle2
                    className={cn(
                      "h-5 w-5 shrink-0",
                      stockStatus === "low"
                        ? "text-amber-500"
                        : "text-emerald-500",
                    )}
                  />
                )}
              </div>

              {/* ================= DESCRIPTION ================= */}
              <div className="mt-7">
                <h2 className="mb-3 text-lg font-bold text-slate-900">
                  Product Description
                </h2>

                <p className="text-sm leading-7 text-slate-600 md:text-base">
                  {data.description ||
                    `Discover ${data.name}, a product selected for quality and value. Check the product specifications and availability before purchasing.`}
                </p>
              </div>

              {/* ================= ACTION BUTTONS ================= */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {/* Add to Cart */}
                <Button
                  type="button"
                  disabled={isOutOfStock || loading}
                  className={cn(
                    "h-12 flex-1 rounded-xl text-base font-semibold shadow-sm transition-all duration-300",
                    "bg-primary text-white",
                    isOutOfStock &&
                      "cursor-not-allowed bg-slate-300 text-slate-500 shadow-none hover:bg-slate-300",
                  )}
                  onClick={() =>{
                    if(user === null){
                      toast.error("Please login to add product to cart", { position: "top-right" })
                      navigate("/login")
                    }else{
                       addToCart({
                      productId: data.id.toString(),
                      quantity: 1,
                    })
                    }
                  }
                   
                  }
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />

                  {isOutOfStock
                    ? "Out of Stock"
                    : "Add to Cart"}
                </Button>

                {/* Continue Shopping */}
                <Link to="/products" className="flex w-full flex-1 cursor-pointer">
                <Button
                  variant="outline"
                  className="h-12 flex-1 rounded-xl border-slate-200 font-semibold transition-colors hover:bg-slate-50"
                >
                    Continue Shopping
                </Button>
                  </Link>
              </div>

              {/* Bottom Trust Information */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Quality Product
                </div>

                <div className="flex items-center gap-1.5">
                  <Package className="h-4 w-4 text-primary" />
                  Stock Availability
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="mt-16">
        <RelatedProduct />
      </div>
    </div>
  )
}

export default ProductDetails