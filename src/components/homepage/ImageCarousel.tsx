import { Button } from "../ui/button"
import phone from "../../assets/img/iphone.png"
import laptop from "../../assets/img/laptop.png"

export function ImageCaarousel() {
  return (
    <>
      <div
        className="relative flex h-120 w-full items-center bg-[#b0b0ae] bg-auto bg-right bg-no-repeat px-[10%] before:absolute before:inset-0 before:bg-white/70 before:content-['']"
        style={{
          backgroundImage: `url(${laptop}) `,
        }}
      >
        <div className="relative z-10 w-1/2">
          <h1 className="text-4xl font-bold">
            Unleash Innovation in Every Byte
          </h1>
          <p className="text-md mt-4">
            Explore a World of Cutting-Edge Technology
          </p>
          <Button className="mt-4 h-12 w-24">Shop Now</Button>
        </div>
        <div className="relative z-10">
          <img src={phone} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </>
  )
}
