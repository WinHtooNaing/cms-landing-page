import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { products } from "../../data"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "../ui/pagination"
import { useEffect, useRef, useState } from "react"
import ProductSkeleton from "../skeleton/ProductSkeleton"
import { motion } from "motion/react"
import Typewriter from "../TypeWriter"

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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  const scrollHead = useRef<HTMLDivElement>(null)

  const scrollToHeader = () => {
    scrollHead.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="mt-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center text-2xl font-bold text-primary md:text-4xl"
        ref={scrollHead}
      >
        <Typewriter text="New Collections" speed={200} />
      </motion.h1>
      {loading ? (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {currentProducts.map(() => (
            <ProductSkeleton />
          ))}
        </div>
      ) : (
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
            {currentProducts.map((product) => (
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
                  <div className="">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-50 w-full border object-cover transition-transform duration-500 ease-out hover:scale-105"
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

                      <div className="flex items-center py-2">
                        <p className="font-semibold">{product.price} ks</p>
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
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                        scrollToHeader()
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                        scrollToHeader()
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProductLists
