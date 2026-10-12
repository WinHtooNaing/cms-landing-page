import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "../ui/button"
const data = [
  {
    title: "Image 1",
    src: "https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Description 1",
  },
  {
    title: "Image 2",
    src: "https://images.unsplash.com/photo-1768293336571-c48f8765a82d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Description 2",
  },
  {
    title: "Image 3",
    src: "https://images.unsplash.com/photo-1768293336571-c48f8765a82d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",

    description: "Description 3",
  },
  {
    title: "Image 4",
    src: "https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",

    description: "Description 4",
  },
  {
    title: "Image 5",
    src: "https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",

    description: "Description 5",
  },
]
export function ImageCaarousel() {
  return (
    <Carousel className="mt-4 w-full">
      <CarouselContent>
        {data.map((_, index) => (
          <CarouselItem key={index}>
            <div
              className="bg-fill flex h-125 w-full items-center rounded-lg bg-center p-4 text-white"
              style={{ backgroundImage: `url(${data[index].src}) ` }}
            >
              <div className="mx-6 flex flex-col gap-2">
                <h3 className="text-2xl font-bold">{data[index].title}</h3>
                <p className="text-sm">{data[index].description}</p>
                <Button>Shop Now</Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
