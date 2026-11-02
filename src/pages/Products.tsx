// import ProductLists from "@/components/productpage/ProductLists"
// import { category, products } from "../data"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
// import { useState } from "react"
// const Productspage = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string[]>([])
//   const [current, setCurrent] = useState(1)

//   const handleCategoryChange = (category: string, checked: boolean) => {
//     setSelectedCategory((prev) =>
//       checked ? [...prev, category] : prev.filter((item) => item !== category)
//     )
//     setCurrent(1)
//   }

//   const filteredProducts =
//     selectedCategory.length === 0
//       ? products
//       : products.filter((product) =>
//           selectedCategory.includes(product.category)
//         )
//   return (
//     <>
//       <section className="mt-20 flex max-md:flex-col">
//         <div className="flex w-full flex-col pt-10 pl-10 md:w-1/5">
//           <h1 className="text-md mb-6 font-bold md:text-lg">
//             Product Categories
//           </h1>
//           <div className="max-md:grid max-md:grid-cols-3 max-md:items-center">
//             {category.map((category) => (
//               <div className="mb-4 flex gap-2" key={category}>
//                 <Checkbox
//                   id={category}
//                   checked={selectedCategory.includes(category)}
//                   onCheckedChange={(checked) =>
//                     handleCategoryChange(category, checked === true)
//                   }
//                 />
//                 <Label htmlFor={category}>{category}</Label>
//               </div>
//             ))}
//           </div>
//           <div className="mt-2 flex flex-col gap-4">
//             <h1 className="md:text-md mb-2 text-sm font-bold">Sort By</h1>
//             <div className="max-md:grid max-md:grid-cols-3">
//               <div className="mb-4 flex gap-2">
//                 <Checkbox id="sort-oldest" />
//                 <Label>Oldest</Label>
//               </div>
//               <div className="flex gap-2">
//                 <Checkbox id="sort-latest" />
//                 <Label>Latest</Label>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mx-10 w-4/5">
//           <ProductLists
//             products={filteredProducts}
//             current={current}
//             setCurrent={setCurrent}
//           />
//         </div>
//       </section>
//     </>
//   )
// }

// export default Productspage

import ProductLists from "@/components/productpage/ProductLists"
import { category, products } from "../data"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { motion } from "motion/react"

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
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [current, setCurrent] = useState(1)

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    setSelectedCategory((prev) =>
      checked
        ? [...prev, categoryName]
        : prev.filter((item) => item !== categoryName)
    )
    setCurrent(1)
  }

  const filteredProducts =
    selectedCategory.length === 0
      ? products
      : products.filter((product) =>
          selectedCategory.includes(product.category)
        )

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
          {category.map((categoryName) => (
            <motion.div
              key={categoryName}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3"
            >
              <Checkbox
                id={categoryName}
                checked={selectedCategory.includes(categoryName)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(categoryName, checked === true)
                }
                className="border-primary/40 data-[state=checked]:bg-primary"
              />

              <Label
                htmlFor={categoryName}
                className="cursor-pointer text-sm text-foreground/80 transition-colors hover:text-primary"
              >
                {categoryName}
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
        <ProductLists
          products={filteredProducts}
          current={current}
          setCurrent={setCurrent}
        />
      </motion.div>
    </section>
  )
}

export default Productspage
