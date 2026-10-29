import { Button } from "../ui/button"
import phone from "../../assets/img/iphone.png"
import laptop from "../../assets/img/laptop.png"

export function ImageCaarousel() {
  return (
    <>
      <div
        className="sm-px-[10%] relative flex h-120 w-full items-center rounded-sm bg-[#b0b0ae] bg-auto bg-right bg-no-repeat px-[5%] before:absolute before:inset-0 before:bg-white/90 before:content-['']"
        style={{
          backgroundImage: `url(${laptop}) `,
        }}
      >
        //{" "}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10" /> */}
        <div className="relative z-10 w-[60%] md:w-1/2">
          <h1 className="text-2xl font-bold md:text-4xl">
            Unleash Innovation in Every Byte
          </h1>
          <p className="text-md mt-4">
            Explore a World of Cutting-Edge Technology
          </p>
          <Button className="mt-4 h-12 w-24">Shop Now</Button>
        </div>
        <div className="relative z-10 w-[40%] md:w-1/2">
          <img
            src={phone}
            alt=""
            className="w-full object-cover max-md:absolute max-md:top-0 max-md:right-0 max-md:h-[250px] max-sm:h-[200px]"
          />
        </div>
      </div>
    </>
  )
}
