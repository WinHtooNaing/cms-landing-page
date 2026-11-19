import ProductLists from "@/components/productpage/ProductLists"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion } from "motion/react"
import { getCategories } from "@/api/categories"
import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "@/api/products"
import ProductSkeleton from "@/components/skeleton/ProductSkeleton"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "cn"
import { useSearchParams } from "react-router-dom"
const sidebarVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
}

const Productspage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedPage = Number(searchParams.get("page"))
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const requestedLimit = Number(searchParams.get("limit"))
  const limit = [6, 12, 18, 24].includes(requestedLimit) ? requestedLimit : 6
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc"
  const requestedCategoryId = searchParams.get("categoryId")
  const categoryId = requestedCategoryId ? requestedCategoryId : undefined

  const updateSearchParams = (updates: Record<string, string | null>) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          nextParams.delete(key)
        } else {
          nextParams.set(key, value)
        }
      })
      return nextParams
    })
  }

  const products = useQuery({
    queryKey: ["products", page, limit, sortOrder, categoryId],
    queryFn: async () => {
      const response = await getAllProducts(page, limit, sortOrder, categoryId)
      return response.data
    },
  })
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories()
      return response.data
    },
  })

  if (products.isPending) {
    return (
      <>
        <section className="mt-20 flex min-h-screen gap-6 px-[5%] py-10 max-md:flex-col">
          <aside className="h-fit w-full shrink-0 rounded-2xl border border-white/60 bg-white/30 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-2xl md:sticky md:top-28 md:w-1/5">
            <div>
              <Card>
                <Skeleton className="h-50 w-full" />
              </Card>
            </div>
          </aside>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </section>
      </>
    )
  }
  return (
    <section className="relative mt-20 flex min-h-screen gap-6 px-[5%] py-10 max-md:flex-col">
      {/* Background Glow */}
      <div className="pointer-events-none fixed top-40 left-0 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none fixed top-1/2 right-0 -z-10 h-72 w-72 rounded-full bg-violet-300/20 blur-[100px]" />

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="h-fit w-full shrink-0 rounded-2xl border border-white/60 bg-white/30 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-2xl md:sticky md:top-28 md:w-1/5"
      >
        {/* Categories */}
        <motion.div variants={itemVariants}>
          <h1 className="mb-6 text-lg font-bold text-foreground">
            Product Categories
          </h1>
        </motion.div>

        <motion.div
          variants={sidebarVariants}
          className="grid grid-cols-2 gap-y-4 sm:grid-cols-3 md:grid-cols-1"
        >
          {categories.data &&
            categories.data.map((categoryName) => (
              <motion.div
                key={categoryName.id}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3"
              >
                <Checkbox
                  id={categoryName.id.toString()}
                  checked={categoryId == categoryName.id.toString()}
                  onCheckedChange={(checked) => {
                    updateSearchParams({
                      categoryId: checked ? String(categoryName.id) : null,
                      page: "1",
                    })
                  }}
                  className="border-primary/40 data-[state=checked]:bg-primary"
                />

                <Label
                  htmlFor={categoryName.id.toString()}
                  className="cursor-pointer text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  {categoryName.name}
                </Label>
              </motion.div>
            ))}
        </motion.div>

        {/* Divider */}
        <div className="my-6 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

        {/* Sort By */}
        <motion.div variants={itemVariants}>
          <h1 className="mb-5 text-base font-bold text-foreground">Sort By</h1>

          <div className="flex flex-col gap-4 sm:flex-row md:flex-col">
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-3"
            >
              <Checkbox
                id="sort-oldest"
                checked={sortOrder === "asc"}
                onCheckedChange={() =>
                  updateSearchParams({ sortOrder: "asc", page: "1" })
                }
              />
              <Label
                htmlFor="sort-oldest"
                className="cursor-pointer text-sm text-foreground/80"
              >
                Oldest
              </Label>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-3"
            >
              <Checkbox
                id="sort-latest"
                checked={sortOrder === "desc"}
                onCheckedChange={() =>
                  updateSearchParams({ sortOrder: "desc", page: "1" })
                }
              />
              <Label
                htmlFor="sort-latest"
                className="cursor-pointer text-sm text-foreground/80"
              >
                Latest
              </Label>
            </motion.div>
          </div>
        </motion.div>
      </motion.aside>

      {/* Product Lists */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="min-w-0 flex-1"
      >
        {products.isError ? (
          <div role="alert" className="mt-10 text-center text-destructive">
            Products could not be loaded. Please try again.
            <button
              type="button"
              onClick={() => void products.refetch()}
              className="ml-2 underline"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <ProductLists products={products.data?.items ?? []} />
            {products.data && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center justify-between gap-4"
              >
                <Label>
                  {products.data.pagination.total === 0
                    ? "Showing 0 of 0 products"
                    : `Showing ${(page - 1) * limit + 1}-${(page - 1) * limit + products.data.items.length} of ${products.data.pagination.total} products`}
                </Label>

                {products.data.pagination.totalPages >= 1 && (
                  <Pagination className="w-auto">
                    <PaginationContent className="gap-2 p-2">
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          aria-disabled={page <= 1}
                          onClick={(event) => {
                            event.preventDefault()
                            updateSearchParams({
                              page: String(Math.max(1, page - 1)),
                            })
                          }}
                          className={cn(
                            "rounded-lg bg-primary/10 transition-colors hover:bg-primary/20",
                            page <= 1 && "pointer-events-none opacity-40"
                          )}
                        />
                      </PaginationItem>
                      {Array.from(
                        {
                          length: Math.min(
                            5,
                            products.data.pagination.totalPages
                          ),
                        },
                        (_, index) => {
                          const totalPages =
                            products.data?.pagination.totalPages ?? 1
                          const firstPage = Math.max(
                            1,
                            Math.min(page - 2, totalPages - 4)
                          )
                          const pageNumber = firstPage + index
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                isActive={pageNumber === page}
                                onClick={(event) => {
                                  event.preventDefault()
                                  updateSearchParams({
                                    page: String(pageNumber),
                                  })
                                }}
                                className={cn(
                                  "rounded-lg",
                                  pageNumber === page &&
                                    "border border-primary/20 bg-primary/10 font-bold text-primary"
                                )}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        }
                      )}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          aria-disabled={
                            page >= products.data.pagination.totalPages
                          }
                          onClick={(event) => {
                            event.preventDefault()
                            updateSearchParams({
                              page: String(
                                Math.min(
                                  products.data?.pagination.totalPages ?? page,
                                  page + 1
                                )
                              ),
                            })
                          }}
                          className={cn(
                            "rounded-lg bg-primary/10 transition-colors hover:bg-primary/20",
                            page >= products.data.pagination.totalPages &&
                              "pointer-events-none opacity-40"
                          )}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}

                <Field
                  orientation="horizontal"
                  className="w-full justify-center sm:w-auto sm:justify-end"
                >
                  <div className="flex items-center gap-2">
                    <FieldLabel htmlFor="select-rows-per-page">
                      Count per page
                    </FieldLabel>
                    <Select
                      value={String(limit)}
                      onValueChange={(value) => {
                        if (value) {
                          updateSearchParams({ limit: value, page: "1" })
                        }
                      }}
                    >
                      <SelectTrigger className="w-20" id="select-rows-per-page">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent align="start">
                        <SelectGroup>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="18">18</SelectItem>
                          <SelectItem value="24">24</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </Field>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </section>
  )
}

export default Productspage
