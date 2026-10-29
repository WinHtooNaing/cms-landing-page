import { useParams, Link } from "react-router-dom"
import { products } from "../data"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { ShoppingCart, Star } from "lucide-react"
import { cn } from "../lib/utils"
import RelatedProduct from "@/components/RelatedProduct"
import { useCartStore } from "@/store/cart-store"
const ProductDetails = () => {
  const { id } = useParams()
  const addToCart = useCartStore((set) => set.addToCart)

  const product = products.find((item) => item.id === Number(id))
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Product Not Found</h1>

        <p className="text-gray-500">
          Sorry, the product you are looking for does not exist.
        </p>

        <Button>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }
  return (
    <div className="container mx-auto px-4 pt-25">
      <Card className="overflow-hidden">
        <CardContent className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_2fr] md:p-10">
          <div className="flex h-60 w-full items-center justify-center overflow-hidden rounded-md bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-500 ease-out hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted stroke-primary text-muted"
                    )}
                  />
                ))}
              </div>

              <span className="text-sm text-gray-500">
                {product.rating} / 5
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <p className="text-3xl font-bold">{product.price} ks</p>

              <p className="text-lg text-gray-500 line-through">
                {product.originalPrice} ks
              </p>
            </div>

            <div className="mt-6">
              <h2 className="mb-2 text-xl font-semibold">
                Product Description
              </h2>

              <p className="leading-7 text-gray-600">
                {product.description ??
                  `Discover ${product.name}, a product selected for quality and value. Check the product specifications and availability before purchasing.`}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="h-12" onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button variant="outline" className="h-12">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <RelatedProduct />
    </div>
  )
}

export default ProductDetails
