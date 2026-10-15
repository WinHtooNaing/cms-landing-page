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

// import { Button } from "../ui/button"
// import phone from "../../assets/img/iphone.png"
// import laptop from "../../assets/img/laptop.png"

// export function ImageCaarousel() {
//   return (
//     <div className="relative isolate flex min-h-[280px] w-full items-center overflow-hidden rounded-sm bg-[#f5f5f5] px-4 py-8 sm:min-h-[350px] sm:px-[5%] lg:min-h-[420px]">
//       {/* Background image */}
//       <div
//         className="absolute inset-0 bg-contain bg-right bg-no-repeat opacity-20 sm:opacity-40"
//         style={{
//           backgroundImage: `url(${laptop})`,
//         }}
//       />

//       {/* White overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10" />

//       {/* Text content */}
//       <div className="relative z-10 w-[65%] sm:w-1/2">
//         <h1 className="text-xl leading-tight font-bold sm:text-3xl lg:text-4xl">
//           Unleash Innovation in Every Byte.
//         </h1>

//         <p className="mt-2 text-xs text-gray-600 sm:mt-4 sm:text-base">
//           Explore a World of Cutting-Edge Technology
//         </p>

//         <Button className="mt-4 h-9 px-4 text-xs sm:mt-6 sm:h-12 sm:px-6 sm:text-sm">
//           Shop Now
//         </Button>
//       </div>

//       <div className="relative z-10 ml-auto w-[40%] sm:w-1/2">
//         <img
//           src={phone}
//           alt="Featured smartphone"
//           className="h-auto max-h-[260px] w-full object-contain sm:max-h-[340px] lg:max-h-[400px]"
//         />
//       </div>
//     </div>
//   )
// }
