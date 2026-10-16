import ProductLists from "@/components/productpage/ProductLists"
import { category, products } from "../data"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"
const Productspage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [current, setCurrent] = useState(1)

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategory((prev) =>
      checked ? [...prev, category] : prev.filter((item) => item !== category)
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
    <>
      <section className="mt-20 flex max-md:flex-col">
        <div className="flex w-full flex-col pt-10 pl-10 md:w-1/5">
          <h1 className="text-md mb-6 font-bold md:text-lg">
            Product Categories
          </h1>
          <div className="max-md:grid max-md:grid-cols-3 max-md:items-center">
            {category.map((category) => (
              <div className="mb-4 flex gap-2" key={category}>
                <Checkbox
                  id={category}
                  checked={selectedCategory.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked === true)
                  }
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-col gap-4">
            <h1 className="md:text-md mb-2 text-sm font-bold">Sort By</h1>
            <div className="max-md:grid max-md:grid-cols-3">
              <div className="flex gap-2">
                <Checkbox id="sort-oldest" />
                <Label>Oldest</Label>
              </div>
              <div className="flex gap-2">
                <Checkbox id="sort-latest" />
                <Label>Latest</Label>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-10 w-4/5">
          <ProductLists
            products={filteredProducts}
            current={current}
            setCurrent={setCurrent}
          />
        </div>
      </section>
    </>
  )
}

export default Productspage
