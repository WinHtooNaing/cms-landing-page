import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

import type { HomeSection } from "@/api/cms.home"

type ImageCarouselProps = {
  slides: HomeSection["items"]
}
export function ImageCaarousel({ slides }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  if (slides.length === 0) return null

  const activeSlideIndex = currentSlide % slides.length
  const slide = slides[activeSlideIndex]

  return (
    <section className="">
      <div className="relative isolate min-h-105 overflow-hidden rounded-3xl border border-white/40 bg-linear-to-br from-slate-100 via-blue-50 to-violet-100 shadow-xl shadow-violet-200/30 md:min-h-125">
        <div className="absolute -top-20 -right-20 -z-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlideIndex}
            className="grid min-h-105 grid-cols-1 items-center gap-4 px-6 py-12 md:min-h-125 md:grid-cols-2 md:px-14 md:py-10"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="relative z-10 flex flex-col items-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
            >
              <h1 className="max-w-xl text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
                {slide.content.title}
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 md:text-base">
                {slide.content.description}
              </p>

              <Link to="/products" className="mt-8">
                <Button className="group from-primary-600 to-primary-500 h-12 rounded-full bg-linear-to-r px-7 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="relative flex h-full min-h-57.5 items-center justify-center md:min-h-100"
              initial={{
                opacity: 0,
                x: 80,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <div className="absolute h-64 w-64 rounded-full bg-white/50 blur-3xl md:h-80 md:w-80" />

              <motion.img
                src={slide.content.imageUrl}
                alt={slide.content.title}
                className="relative z-10 max-h-70 w-full object-contain drop-shadow-2xl md:max-h-100"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={slides[index].content.productId}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                activeSlideIndex === index
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-slate-400/50 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
