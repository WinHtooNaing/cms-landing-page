import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const ProductDetailsSkeleton = () => {
  return (
    <div className="relative container mx-auto px-4 pt-25 md:px-10 lg:px-30">
      <div className="pointer-events-none absolute top-20 left-20 z-0 h-80 w-80 rounded-full bg-primary/30 blur-[120px] sm:top-50 sm:left-100 sm:h-100 sm:w-150" />
      <div className="pointer-events-none absolute top-20 right-0 z-0 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />

      <Card className="relative z-10 overflow-hidden">
        <CardContent className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_2fr] md:p-10">
          <Skeleton className="aspect-square w-full max-w-80" />

          <div className="flex flex-col">
            <Skeleton className="mb-3 h-10 w-full max-w-100" />
            <Skeleton className="mb-4 h-10 w-full max-w-80" />

            <Skeleton className="mb-4 h-20 w-full max-w-120" />

            <div className="flex flex-wrap gap-4">
              <Skeleton className="mb-4 h-10 w-30" />
              <Skeleton className="mb-4 h-10 w-30" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductDetailsSkeleton
