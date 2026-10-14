import { Card, CardContent } from "@/components/ui/card"
import { Button } from "../ui/button"
import { products } from "../../data"
const ProductLists = () => {
  return (
    <div className="mt-20">
      <h1 className="mb-10 text-center text-4xl font-bold">New Collections</h1>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
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
                <p className="text-xl font-semibold">
                  {product.name.slice(0, 15)}{" "}
                  {product.name.length > 15 && "..."}
                </p>
                <div className="flex items-center py-2">
                  <p className="font-semibold">{product.price} ks</p>
                </div>
                <div>
                  <Button>See Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProductLists
