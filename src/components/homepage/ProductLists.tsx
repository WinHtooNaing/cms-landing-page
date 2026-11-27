import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { motion } from "motion/react"
import Typewriter from "../TypeWriter"
import { newCollection } from "@/api/products"
import { useQuery } from "@tanstack/react-query"
import ProductSkeleton from "../skeleton/ProductSkeleton"
import type { HomeSection } from "@/api/cms.home"

type CollectionProps = {
  data: HomeSection["items"]
}
// Parent animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

// Card animation
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
}

const ProductLists = ({ data }: CollectionProps) => {
  const collectionData = async () => {
    const response = await newCollection()
    return response.data.items
  }
  const {
    isError,
    data: collection,
    isLoading,
  } = useQuery({
    queryKey: ["collection"],
    queryFn: collectionData,
  })

  const collectionIds = new Set(
    (data ?? []).map((item) => String(item.content.productId))
  )

  const filteredCollections = (collection ?? []).filter((collection) =>
    collectionIds.has(String(collection.id))
  )
  

  if (isError) return <p>Something went wrong</p>
  if (isLoading) {
    return (
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="mt-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center text-2xl font-bold text-primary md:text-4xl"
      >
        <Typewriter text="New Collections" speed={200} />
      </motion.h1>
      {filteredCollections && (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.1,
            }}
            className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {filteredCollections.map((product) => (
              <motion.div
              key={product.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <Card className="relative overflow-hidden"> 
                  {product.discountPercentage > 0 && (
          <div className="absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-sm font-bold text-white shadow-md">
            {Math.floor(product.discountPercentage)}% OFF
          </div>
        )}
        {/* Out of Stock Overlay */}
  {Number(product.stock.availableQuantity) <= 0 && (
     <div className="absolute inset-0 z-20 overflow-hidden">
    <div className="absolute -left-12 top-8 -rotate-45 bg-red-600 px-12 py-3 text-sm font-bold tracking-widest text-white shadow-lg">
      OUT OF STOCK
    </div>
  </div>
  )}
                  <div className="px-4">

  
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-50 w-full rounded-md border object-cover transition-transform duration-500 ease-out hover:scale-105"
                    />
                  </div>
                  <CardContent>
                    <div className="py-4">
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <p className="text-xl font-semibold">
                              {product.name.slice(0, 15)}{" "}
                              {product.name.length > 15 && "..."}
                            </p>
                          }
                        />
                        <TooltipContent>
                          <p>{product.name}</p>
                        </TooltipContent>
                      </Tooltip>

                      <div className="flex items-center gap-2 py-2">
                        <p className="text-sm text-muted-foreground line-through">
                          {product.originalPrice == 0 || null
                            ? ""
                            : product.originalPrice }
                        </p>
                        <p className="font-bold text-primary">
                          {product.price} ks
                        </p>
                      </div>
                      <div>
                        <Link
                          to={`/products/${product.id}`}
                          className="inline-flex h-10 w-30 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        >
                          See Details
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  )
}

export default ProductLists
