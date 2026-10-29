import { Button } from "../ui/button"
import phone from "../../assets/img/iphone.png"
import laptop from "../../assets/img/laptop.png"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import CarouselSkeleton from "../skeleton/CarouselSkeleton"

export function ImageCaarousel() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <>
      {loading ? (
        <CarouselSkeleton />
      ) : (
        <>
          <div
            className="sm-px-[10%] relative flex h-120 w-full items-center rounded-sm bg-[#e9e9e4] bg-auto bg-right bg-no-repeat px-[5%] before:absolute before:inset-0 before:bg-white/90 before:content-['']"
            style={{
              backgroundImage: `url(${laptop}) `,
            }}
          >
            <div className="relative z-10 w-[60%] md:w-1/2">
              <h1 className="text-2xl font-bold text-primary md:text-4xl">
                Unleash Innovation in Every Byte
              </h1>
              <p className="text-md mt-4">
                Explore a World of Cutting-Edge Technology
              </p>
              <Button className="mt-4 h-12 w-24">
                <Link to="/products">Shop Now</Link>
              </Button>
            </div>
            <div className="relative z-10 w-[40%] md:w-1/2">
              <img
                src={phone}
                alt=""
                className="w-full object-cover max-md:absolute max-md:top-0 max-md:right-0 max-md:h-62.5 max-sm:h-50"
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}
