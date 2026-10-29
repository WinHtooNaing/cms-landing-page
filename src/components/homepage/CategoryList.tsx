import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import { useEffect, useState } from "react"
import CategorySkeleton from "../skeleton/CategorySkeleton"

const categories = [
  {
    id: 1,
    name: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  },
  {
    id: 2,
    name: "TV & Entertainment",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400",
  },
  {
    id: 4,
    name: "Mobile Phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
  },
  {
    id: 5,
    name: "Laptops & Computers",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
  },
  {
    id: 6,
    name: "Audio & Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
  {
    id: 7,
    name: "Cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
  },
  {
    id: 8,
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400",
  },
  {
    id: 9,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400",
  },
  {
    id: 10,
    name: "Smart Home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400",
  },
]
const CategoryList = () => {
  const [loading, SetLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      SetLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between px-2 pb-10">
        <p className="text-md font-semibold text-primary sm:text-lg">
          Shop By Category
        </p>
        <p className="text-md cursor-pointer text-gray-500">
          <Link to="/products">see all</Link>
        </p>
      </div>
      <div>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map(() => (
              <CategorySkeleton />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <Card>
                <CardContent className="">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-50 w-full rounded-md object-cover"
                  />
                </CardContent>
                <CardFooter>
                  <CardTitle>{category.name}</CardTitle>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryList
