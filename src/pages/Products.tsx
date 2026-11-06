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
import { useState } from "react"
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
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(4)
  const [sortOrder, setSortOrder] = useState("desc")
  // const [categoryId, setCategoryId] = useState(null)
  const getProducts = async () => {
    const response = await getAllProducts(page, limit, sortOrder)
    return response.data
  }

  const getCategory = async () => {
    const response = await getCategories()
    return response.data
  }
  const products = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  })

  if (products.isPending && categories.isPending) {
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
            {Array.from({ length: 6 }).map(() => (
              <ProductSkeleton />
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
                  // checked={selectedCategory.includes(
                  //   categoryName.id.toString()
                  // )}
                  // onCheckedChange={(checked) =>
                  //   handleCategoryChange(
                  //     categoryName.id.toString(),
                  //     checked === true
                  //   )
                  // }
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
              <Checkbox id="sort-oldest" />
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
              <Checkbox id="sort-latest" />
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
        <ProductLists products={products.data?.items ?? []} />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex justify-around"
        >
          <div className="flex w-full items-center">
            <Label>showing 1-3 out of 3 </Label>
          </div>

          <Pagination className="w-full">
            <PaginationContent className="gap-2 p-2">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => {
                    setPage((prev) => prev - 1)
                  }}
                  className={cn(
                    "cursor-pointer rounded-lg bg-primary/10 transition-colors hover:bg-primary/20"
                  )}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className="cursor-default rounded-lg border border-primary/20 bg-primary/10 font-bold text-primary"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => {
                    setPage((prev) => prev + 1)
                  }}
                  className={cn(
                    "cursor-pointer rounded-lg bg-primary/10 transition-colors hover:bg-primary/20"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <Field orientation="horizontal" className="flex w-full justify-end">
            <div className="flex gap-2">
              <FieldLabel htmlFor="select-rows-per-page">
                Count per page
              </FieldLabel>
              <Select defaultValue="6">
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
      </motion.div>
    </section>
  )
}

export default Productspage
