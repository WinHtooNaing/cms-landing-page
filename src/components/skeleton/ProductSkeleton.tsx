import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const ProductSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
        <div className="mt-4 flex flex-col gap-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductSkeleton
