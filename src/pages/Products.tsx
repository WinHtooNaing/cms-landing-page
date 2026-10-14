import ProductLists from "@/components/productpage/ProductLists"
import { category } from "../data"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
const Productspage = () => {
  return (
    <>
      <section className="mt-20 flex">
        <div className="flex w-1/4 flex-col pt-10 pl-20">
          <h1 className="mb-4 text-xl font-bold">Product Categories</h1>
          {category.map((category) => (
            <div className="mb-4 flex gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">{category}</Label>
            </div>
          ))}
        </div>
        <div className="mx-20 w-3/4">
          <ProductLists />
        </div>
      </section>
    </>
  )
}

export default Productspage
