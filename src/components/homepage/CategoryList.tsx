// import { Link } from "react-router-dom"
// import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
// import { useEffect, useState } from "react"
// import CategorySkeleton from "../skeleton/CategorySkeleton"

// const categories = [
//   {
//     id: 1,
//     name: "Watches",
//     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
//   },
//   {
//     id: 2,
//     name: "TV & Entertainment",
//     image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
//   },
//   {
//     id: 3,
//     name: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400",
//   },
//   {
//     id: 4,
//     name: "Mobile Phones",
//     image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
//   },
//   {
//     id: 5,
//     name: "Laptops & Computers",
//     image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
//   },
//   {
//     id: 6,
//     name: "Audio & Headphones",
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
//   },
//   {
//     id: 7,
//     name: "Cameras",
//     image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
//   },
//   {
//     id: 8,
//     name: "Gaming",
//     image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400",
//   },
//   {
//     id: 9,
//     name: "Accessories",
//     image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400",
//   },
//   {
//     id: 10,
//     name: "Smart Home",
//     image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400",
//   },
// ]
// const CategoryList = () => {
//   const [loading, SetLoading] = useState(true)

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       SetLoading(false)
//     }, 3000)
//     return () => clearTimeout(timer)
//   }, [])
//   return (
//     <div className="mt-10">
//       <div className="flex items-center justify-between px-2 pb-10">
//         <p className="text-md font-semibold text-primary sm:text-lg">
//           Shop By Category
//         </p>
//         <p className="text-md cursor-pointer text-gray-500">
//           <Link to="/products">see all</Link>
//         </p>
//       </div>
//       <div>
//         {loading ? (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {categories.slice(0, 6).map(() => (
//               <CategorySkeleton />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {categories.slice(0, 6).map((category) => (
//               <Card>
//                 <CardContent className="">
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="h-50 w-full rounded-md object-cover"
//                   />
//                 </CardContent>
//                 <CardFooter>
//                   <CardTitle>{category.name}</CardTitle>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CategoryList

import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"

import { motion } from "motion/react"
import Typewriter from "../TypeWriter"

const categories = [
  {
    id: 1,
    name: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    id: 2,
    name: "TV & Entertainment",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
  },
  {
    id: 4,
    name: "Mobile Phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
  },
  {
    id: 5,
    name: "Laptops & Computers",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
  },
  {
    id: 6,
    name: "Audio & Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },
  {
    id: 7,
    name: "Cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
  },
  {
    id: 8,
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600",
  },
  {
    id: 9,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600",
  },
  {
    id: 10,
    name: "Smart Home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600",
  },
]

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
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {categories.slice(0, 6).map((category) => (
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
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
