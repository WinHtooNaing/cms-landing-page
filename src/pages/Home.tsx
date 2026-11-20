import { getHomeSection } from "@/api/cms.home"
import CategoryList from "@/components/homepage/CategoryList"
import { ImageCaarousel } from "@/components/homepage/ImageCarousel"
import ProductLists from "@/components/homepage/ProductLists"
import { useQuery } from "@tanstack/react-query"
import { HOME_SECTION_KEYS } from "@/lib/cms-key"
import CarouselSkeleton from "@/components/skeleton/CarouselSkeleton"
const Homepage = () => {
  const { data: sections = [], isPending } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const response = await getHomeSection()
      return response.data.sections
    },
  })
  if (isPending) {
    return (
      <div className="mt-20 h-screen w-full px-10">
        <CarouselSkeleton />
      </div>
    )
  }
  const image_carousel = sections.find(
    ({ key }) => key === HOME_SECTION_KEYS.IMAGE_CAROUSEL
  )
  const category = sections.find(
    ({ key }) => key === HOME_SECTION_KEYS.CATEGORY
  )
  const collection = sections.find(
    ({ key }) => key === HOME_SECTION_KEYS.COLLECTION
  )

  return (
    <div className="mx-auto mt-24 w-[90%]">
      <ImageCaarousel slides={image_carousel?.items ?? []} />
      <CategoryList data={category?.items ?? []} />
      <ProductLists data={collection?.items ?? []} />
    </div>
  )
}

export default Homepage
