import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "../ui/card"

const CategorySkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  )
}

export default CategorySkeleton
