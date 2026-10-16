import { products } from "./../data"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useParams } from "react-router-dom"
import { ShoppingCartPlus, Star } from "lucide-react"
import { cn } from "cn"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
const RelatedProduct = () => {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))
  if (!product) return null

  const relatedProducts = products.filter(
    (item) => item.category === product.category && product.id !== item.id
  )

  return (
    <div className="mt-20">
      <h1 className="mb-10 text-center text-4xl font-bold">Related Products</h1>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <div className="">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-60 w-full rounded-md object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="py-4">
                <p className="text-xl font-semibold">
                  {item.name.slice(0, 15)}
                  {item.name.length > 15 && "..."}
                </p>
                <div className="flex items-center gap-2 py-2">
                  <p className="text-gray-500 line-through">
                    {item.originalPrice}
                  </p>
                  <p className="font-semibold">{item.price} ks</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          i < Math.floor(item.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted stroke-primary text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <small className="text-sm font-normal text-foreground">
                    {item.rating}
                  </small>
                </div>
                <div className="mt-2 flex w-full items-center gap-4">
                  <div className="rounded-sm border border-black p-2">
                    <Tooltip>
                      <TooltipTrigger render={<ShoppingCartPlus />} />
                      <TooltipContent>Add to cart</TooltipContent>
                    </Tooltip>
                  </div>
                  <Link
                    to={`/products/${item.id}`}
                    className="inline-flex h-10 w-30 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct
