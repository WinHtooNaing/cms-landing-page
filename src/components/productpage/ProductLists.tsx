import { Card, CardContent } from "@/components/ui/card"
import { Button } from "../ui/button"
import { ShoppingCartPlus, Star } from "lucide-react"
import { cn } from "cn"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { products } from "../../data"
const ProductLists = () => {
  return (
    <div className="mt-10">
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card>
            <div className="">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <CardContent>
              <div className="py-4">
                <p className="text-xl font-semibold">
                  {product.name.slice(0, 15)}...
                </p>
                <div className="flex items-center gap-2 py-2">
                  <p className="text-gray-500 line-through">
                    {product.originalPrice}
                  </p>
                  <p className="font-semibold">{product.price} ks</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted stroke-primary text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <small className="text-sm font-normal text-foreground">
                    {product.rating}
                  </small>
                </div>
                <div className="mt-2 flex w-full items-center gap-4">
                  <div className="rounded-sm border border-black p-2">
                    <Tooltip>
                      <TooltipTrigger render={<ShoppingCartPlus />} />
                      <TooltipContent>Add to cart</TooltipContent>
                    </Tooltip>
                  </div>
                  <Button className="h-10 w-30">Buy Now</Button>
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
