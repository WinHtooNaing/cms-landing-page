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

const ProductLists = () => {
  const collectionData = async () => {
    const response = await newCollection()
    return response.data.items
  }
  const { isError, data, isLoading } = useQuery({
    queryKey: ["collection"],
    queryFn: collectionData,
  })

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
      {data && (
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
            {data.map((product) => (
              <motion.div
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
                <Card>
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
                            : product.originalPrice}
                          {product.originalPrice == 0 || null ? "" : "ks"}
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
                          Buy Now
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
