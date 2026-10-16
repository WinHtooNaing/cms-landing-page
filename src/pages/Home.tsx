import CategoryList from "@/components/homepage/CategoryList"
import { ImageCaarousel } from "@/components/homepage/ImageCarousel"
import ProductLists from "@/components/homepage/ProductLists"

const Homepage = () => {
  return (
    <div className="mx-auto mt-30 w-[90%]">
      <ImageCaarousel />
      <CategoryList />
      <ProductLists />
    </div>
  )
}

export default Homepage
