import { Card, CardContent } from "@/components/ui/card"
import { Button } from "../ui/button"
import { ShoppingCartPlus, Star } from "lucide-react"
import { cn } from "cn"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { products } from "../../data"
import { useRef } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "../ui/pagination"
import { Link } from "react-router-dom"
type Product = (typeof products)[number]

type ProductListsProps = {
  products: Product[]
  current: number
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}
const ProductLists = ({ products, current, setCurrent }: ProductListsProps) => {
  // const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (current - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  const scrollHead = useRef<HTMLDivElement>(null)
  //scroll to top
  const scrollToHeader = () => {
    scrollHead.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="mt-10" ref={scrollHead}>
      {currentProducts.length === 0 ? (
        <h1 className="mt-20 text-center text-3xl font-bold">
          No products found
        </h1>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentProducts.map((product) => (
            <Card key={product.id}>
              <CardContent>
                <div className="">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-60 w-full rounded-md object-cover transition-transform duration-500 ease-out hover:scale-105"
                  />
                </div>
                <div className="py-4">
                  <p className="text-xl font-semibold">
                    {product.name.slice(0, 15)}
                    {product.name.length > 15 && "..."}
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
                    <Button className="h-10 w-30">
                      <Link to={`/products/${product.id}`}>Buy Now</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {currentProducts.length > 0 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrent((prev) => Math.max(1, prev - 1))
                    scrollToHeader()
                  }}
                  className={
                    current === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive className="cursor-default">
                  {current}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrent((prev) => Math.min(totalPages, prev + 1))
                    scrollToHeader()
                  }}
                  className={
                    current === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

export default ProductLists
