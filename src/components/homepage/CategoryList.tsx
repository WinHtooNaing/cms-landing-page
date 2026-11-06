import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"

import { motion } from "motion/react"
import Typewriter from "../TypeWriter"
import { getCategories } from "@/api/categories"
import { useQuery } from "@tanstack/react-query"
import CategorySkeleton from "../skeleton/CategorySkeleton"

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

const CategoryList = () => {
  const getCategory = async () => {
    const response = await getCategories()
    return response.data
  }
  const { isPending, error, data } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  })

  if (isPending) {
    return (
      <>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      </>
    )
  }

  if (error) return <p>Something went wrong</p>

  return (
    <section className="relative mt-16">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-20 left-10 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="pointer-events-none absolute right-10 bottom-0 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center justify-between px-2"
      >
        <div>
          <h2 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
            Shop By Category
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Explore our wide range of products
          </p>
        </div>

        <Link
          to="/products"
          className="rounded-full border border-white/40 bg-white/30 px-5 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur-xl transition-all hover:bg-white/60 hover:shadow-md"
        >
          See All
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.2,
        }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {data &&
          data.map((category) => (
            <motion.div
              key={category.id}
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
              <Link to="/products">
                <Card className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/30 py-0 shadow-lg shadow-black/5 backdrop-blur-xl transition-shadow duration-300 hover:border-white/80 hover:shadow-xl hover:shadow-primary/10">
                  {/* Image */}
                  <CardContent className="relative overflow-hidden p-3 pb-0">
                    <div className="relative overflow-hidden rounded-xl">
                      <motion.img
                        src={category.imageUrl}
                        alt={category.name}
                        loading="lazy"
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-110 max-sm:aspect-4/3 sm:h-52"
                      />

                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-white/10 opacity-70 transition-opacity duration-300 group-hover:opacity-40" />
                    </div>
                  </CardContent>

                  {/* Category Name */}
                  <CardFooter className="flex items-center justify-between px-5 py-4">
                    <CardTitle className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                      <Typewriter text={category.name} speed={150} />
                    </CardTitle>

                    <motion.span
                      className="text-xl text-primary"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      &rarr;
                    </motion.span>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
      </motion.div>
    </section>
  )
}

export default CategoryList
