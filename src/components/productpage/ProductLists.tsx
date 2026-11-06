import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCartPlus, Star } from "lucide-react"
import { cn } from "cn"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import type { newCollectionProps } from "@/api/products"

import { createAddToCart, type createAddToCartProps } from "@/api/addToCart"

type ProductListsProps = {
  products: newCollectionProps[]
}
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
}

const ProductLists = ({ products }: ProductListsProps) => {
  const addToCart = async (payload: createAddToCartProps) => {
    try {
      const response = await createAddToCart(payload)
      if (response.success) {
        toast.success("product added to cart", { position: "bottom-right" })
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error("something went wrong")
    }
  }

  return (
    <div className="mt-10 scroll-mt-24">
      {products && products.length === 0 ? (
        <h1 className="mt-20 text-center text-3xl font-bold">
          No products found
        </h1>
      ) : (
        <motion.div
          // key={current}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products &&
            products.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="group h-full overflow-hidden rounded-2xl border border-white/60 bg-white/30 shadow-lg shadow-slate-200/40 backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <CardContent className="p-3">
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-60 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    {/* Product Information */}
                    <div className="px-1 py-4">
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <p className="cursor-pointer truncate text-lg font-semibold text-foreground">
                              {product.name.slice(0, 15)}
                              {product.name.length > 15 && "..."}
                            </p>
                          }
                        />
                        <TooltipContent>
                          <p>{product.name}</p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Price */}
                      <div className="flex items-center gap-2 py-2">
                        <p className="text-sm text-muted-foreground line-through">
                          {Number(product.price) + Number(product.price) / 10}{" "}
                          ks
                        </p>
                        <p className="font-bold text-primary">
                          {product.price} ks
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-3.5 w-3.5",
                                i < 5
                                  ? "fill-primary text-primary"
                                  : "fill-muted stroke-primary text-muted"
                              )}
                            />
                          ))}
                        </div>

                        <small className="text-sm text-muted-foreground">
                          4.5
                        </small>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex w-full items-center gap-3">
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <button
                                type="button"
                                onClick={() =>
                                  addToCart({
                                    productId: product.id,
                                    quantity: 1,
                                  })
                                }
                                aria-label={`Add ${product.name} to cart`}
                                className="flex h-10 w-11 items-center justify-center rounded-lg border border-primary/30 bg-white/50 text-primary backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                              >
                                <ShoppingCartPlus className="h-5 w-5" />
                              </button>
                            }
                          />
                          <TooltipContent>Add to cart</TooltipContent>
                        </Tooltip>

                        <Link
                          to={`/products/${product.id}`}
                          className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-linear-to-r from-primary to-primary/80 px-4 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
                        >
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </motion.div>
      )}

      {/* Pagination */}
      {/* {currentProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <Pagination>
            <PaginationContent className="gap-2 rounded-xl border border-white/50 bg-white/30 p-2 shadow-lg backdrop-blur-xl">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrent((prev) => Math.max(1, prev - 1))
                    scrollToHeader()
                  }}
                  className={cn(
                    "cursor-pointer rounded-lg transition-colors hover:bg-primary/10",
                    current === 1 && "pointer-events-none opacity-40"
                  )}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className="cursor-default rounded-lg border border-primary/20 bg-primary/10 font-bold text-primary"
                >
                  {current}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrent((prev) => Math.min(totalPages, prev + 1))
                    scrollToHeader()
                  }}
                  className={cn(
                    "cursor-pointer rounded-lg transition-colors hover:bg-primary/10",
                    current === totalPages && "pointer-events-none opacity-40"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      )} */}
    </div>
  )
}

export default ProductLists
