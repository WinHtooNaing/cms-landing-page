import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Lightbulb,
  Users,
  CheckCircle2,
  Zap,
  Headphones,
  Truck,
  ShieldAlert,
} from "lucide-react"
import { CardContent, Card } from "@/components/ui/card"
import { motion } from "motion/react"
import Typewriter from "@/components/TypeWriter"
import { getAboutSection } from "@/api/cms.about"
import { useQuery } from "@tanstack/react-query"
import { ABOUT_SECTION_KEYS } from "@/lib/cms-key"
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}
const coreValueIcons = [ShieldCheck, Heart, Lightbulb, Users]
const whyChooseUsIcons = [Headphones, Truck, Heart, ShieldAlert]
const Aboutpage = () => {
  const { data: sections = [], isPending } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const response = await getAboutSection()
      return response.data.sections
    },
  })
  if (isPending) {
    return (
      <section className="flex h-screen w-full items-center justify-center">
        <span className="items-center text-center">Loading...</span>
      </section>
    )
  }

  const introduction = sections.find(
    ({ key }) => key === ABOUT_SECTION_KEYS.INTRODUCTION
  )
  const whoWeAre = sections.find(
    ({ key }) => key === ABOUT_SECTION_KEYS.WHO_WE_ARE
  )
  const coreValues = sections.find(
    ({ key }) => key === ABOUT_SECTION_KEYS.CORE_VALUES
  )
  const Mission_Vision = sections.find(
    ({ key }) => key === ABOUT_SECTION_KEYS.MISSION_VISION
  )
  const whyChooseUs = sections.find(
    ({ key }) => key === ABOUT_SECTION_KEYS.WHY_CHOOSE_US
  )

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute top-40 left-0 z-0 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
        <div className="pointer-events-none absolute top-40 right-0 z-0 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="relative overflow-hidden px-6 py-20 text-foreground sm:px-10 lg:pt-32 lg:pb-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl pl-16">
              <span className="inline-flex rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                {introduction?.content.badge}
              </span>

              <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {introduction?.content.heading}
                <span className="block text-primary">
                  {introduction?.content.highlightedHeading}
                </span>
              </h1>

              <p className="mt-6 max-w-4xl text-justify text-base leading-8 text-primary sm:text-lg">
                {introduction?.content.description}
              </p>
            </div>
          </div>
        </motion.section>
        <section className="px-6 py-16 sm:px-10 lg:py-10">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-muted via-background to-secondary p-8 sm:min-h-105">
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="max-w-sm text-center"
                >
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl">
                    <Zap className="h-12 w-12" />
                  </div>

                  <h3 className="mt-6 text-3xl font-bold text-foreground">
                    Tech Haven
                  </h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    Discover technology. Find your possibilities.
                  </p>
                </motion.div>
              </div>

              <div className="absolute right-4 -bottom-6 rounded-2xl border border-border bg-card p-4 shadow-lg sm:right-8 sm:p-5">
                <p className="text-sm font-medium text-muted-foreground">
                  Our Commitment
                </p>

                <p className="mt-1 font-bold text-foreground">
                  Quality. Trust. Innovation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7 }}
              className="pt-4 lg:pt-0"
            >
              <span className="text-sm font-semibold tracking-widest text-primary uppercase">
                {whoWeAre?.content.badge}
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {whoWeAre?.content.heading}
                <span className="block text-primary">
                  {whoWeAre?.content.highlightedHeading}
                </span>
              </h2>

              <p className="mt-6 leading-8 text-muted-foreground">
                {whoWeAre?.content.description}
              </p>

              <p className="mt-4 leading-8 text-muted-foreground">
                {whoWeAre?.content.secondaryDescription}
              </p>
              <div className="mt-7 space-y-4">
                {whoWeAre?.items.map((item) => (
                  <div
                    key={item.content.title}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />

                    <span className="text-sm font-medium text-foreground sm:text-base">
                      {item.content.title}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        <section className="bg-muted px-6 py-16 sm:px-10 lg:py-20">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView={"visible"}
            viewport={{ once: false, amount: 0.2 }}
            className="mx-auto max-w-7xl"
          >
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold tracking-widest text-primary uppercase">
                Our Purpose
              </span>

              <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                <Typewriter text="Our Mission & Vision" />
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                Everything we do is guided by our commitment to making
                technology easier to discover and understand.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView={"visible"}
              viewport={{ once: false, amount: 0.1 }}
              className="grid gap-6 md:grid-cols-2"
            >
              <motion.div variants={itemVariants} whileHover={{ x: -20 }}>
                <Card className="rounded-2xl border-border shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-7 sm:p-9">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Target className="h-7 w-7" />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold text-foreground">
                      {Mission_Vision?.items[0].content.title}
                    </h3>

                    <p className="mt-4 leading-8 text-muted-foreground">
                      {Mission_Vision?.items[0].content.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ x: 20 }}>
                <Card className="rounded-2xl border-border shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-7 sm:p-9">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Eye className="h-7 w-7" />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold text-foreground">
                      {Mission_Vision?.items[1].content.title}
                    </h3>

                    <p className="mt-4 leading-8 text-muted-foreground">
                      {Mission_Vision?.items[1].content.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
        <section className="px-6 py-16 sm:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView={"visible"}
              viewport={{ once: false, amount: 0.1 }}
              className="mx-auto mb-12 max-w-2xl text-center"
            >
              <span className="text-sm font-semibold tracking-widest text-primary uppercase">
                What We Believe
              </span>

              <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                Our Core Values
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                The principles that guide how we serve our customers and develop
                our platform.
              </p>
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView={"visible"}
              viewport={{ once: false, amount: 0.1 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {coreValues?.items.map((value, index) => {
                const Icon = coreValueIcons[index] ?? ShieldCheck

                return (
                  <Card
                    key={value.content.title}
                    className="group rounded-2xl border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-6 w-6" />
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-foreground">
                        {value.content.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {value.content.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </motion.div>
          </div>
        </section>
        <section className="bg-muted px-6 py-16 sm:px-10 lg:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView={"visible"}
            viewport={{ once: false, amount: 0.1 }}
            className="mx-auto max-w-7xl"
          >
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold tracking-widest text-primary uppercase">
                The Tech Haven Difference
              </span>

              <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                Why Choose Us?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                We focus on the details that help make your technology shopping
                experience more convenient.
              </p>
            </div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView={"visible"}
              viewport={{ once: false, amount: 0.1 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {whyChooseUs?.items.map((benefit, index) => {
                const Icon = whyChooseUsIcons[index] ?? ShieldCheck

                return (
                  <div
                    key={benefit.content.title}
                    className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-foreground">
                      {benefit.content.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {benefit.content.description}
                    </p>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        </section>
        <section className="px-6 py-16 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let's Find Your Next Favorite Tech
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-primary-foreground/80">
              Explore our product collection or contact our team if you need
              help finding the right technology for your needs.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-accent"
              >
                <Link to="/products">Browse Products</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Aboutpage
