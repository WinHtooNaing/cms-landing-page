import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Lightbulb,
  Users,
  ArrowRight,
  CheckCircle2,
  Zap,
  Headphones,
  Truck,
} from "lucide-react"
import { CardContent, Card } from "@/components/ui/card"
const Aboutpage = () => {
  const coreValues = [
    {
      icon: ShieldCheck,
      title: "Quality & Trust",
      description:
        "We focus on quality products and transparent information so customers can shop with confidence.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We put our customers first by making their shopping experience simple, helpful, and enjoyable.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace new technologies and ideas to make discovering the right products easier.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We aim to build lasting relationships with customers through reliable service and support.",
    },
  ]
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Quality Products",
      description:
        "Explore carefully selected technology products with clear and helpful product information.",
    },
    {
      icon: Truck,
      title: "Convenient Shopping",
      description:
        "Browse products and discover options that suit your needs from wherever you are.",
    },
    {
      icon: Headphones,
      title: "Helpful Support",
      description:
        "Our contact team is available to help answer your questions and guide your shopping experience.",
    },
    {
      icon: Zap,
      title: "Modern Technology",
      description:
        "Discover modern electronics and technology products in one convenient place.",
    },
  ]
  return (
    <>
      <main className="min-full bg-white pt-20">
        <section className="relative overflow-hidden bg-white px-6 py-20 text-slate-800 sm:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-500">
                Get to Know Us
              </span>

              <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Technology That
                <span className="block text-blue-400">Moves You Forward.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-800 sm:text-lg">
                Welcome to Tech Haven, your destination for discovering modern
                technology and electronics. We believe that finding the right
                technology should be simple, convenient, and accessible to
                everyone.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-700">
                  <Link to="/products">Explore Products</Link>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 bg-transparent text-slate-800 hover:bg-slate-300 hover:text-slate-950"
                >
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-16 sm:px-10 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-blue-100 via-indigo-50 to-slate-100 p-8 sm:min-h-105">
                <div className="max-w-sm text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                    <Zap className="h-12 w-12" />
                  </div>

                  <h3 className="mt-6 text-3xl font-bold text-slate-900">
                    Tech Haven
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    Discover technology. Find your possibilities.
                  </p>
                </div>
              </div>

              <div className="absolute right-4 -bottom-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg sm:right-8 sm:p-5">
                <p className="text-sm font-medium text-slate-500">
                  Our Commitment
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  Quality. Trust. Innovation.
                </p>
              </div>
            </div>

            <div className="pt-4 lg:pt-0">
              <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
                Who We Are
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Making Technology
                <span className="block text-blue-600">Easier for Everyone</span>
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                At Tech Haven, we want to make exploring technology easier for
                everyone. Our platform brings technology products together in
                one place, helping customers discover options that match their
                interests and needs.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                From everyday electronics to modern tech accessories, we aim to
                provide a convenient browsing experience, useful product
                information, and responsive customer support.
              </p>
              <div className="mt-7 space-y-4">
                {[
                  "Easy product discovery",
                  "Clear product information",
                  "Customer-focused service",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />

                    <span className="text-sm font-medium text-slate-700 sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-slate-50 px-6 py-16 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
                Our Purpose
              </span>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Our Mission & Vision
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                Everything we do is guided by our commitment to making
                technology easier to discover and understand.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="rounded-2xl border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-7 sm:p-9">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Target className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    Our Mission
                  </h3>

                  <p className="mt-4 leading-8 text-slate-600">
                    Our mission is to make technology shopping simple and
                    convenient by helping customers explore products, understand
                    their options, and make informed decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-7 sm:p-9">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Eye className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    Our Vision
                  </h3>

                  <p className="mt-4 leading-8 text-slate-600">
                    Our vision is to become a trusted destination for
                    discovering technology products by creating an accessible,
                    customer-focused, and continuously improving shopping
                    experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="px-6 py-16 sm:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
                What We Believe
              </span>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Our Core Values
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                The principles that guide how we serve our customers and develop
                our platform.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coreValues.map((value) => {
                const Icon = value.icon

                return (
                  <Card
                    key={value.title}
                    className="group rounded-2xl border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-slate-900">
                        {value.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
        <section className="bg-slate-50 px-6 py-16 sm:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
                The Tech Haven Difference
              </span>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Why Choose Us?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                We focus on the details that help make your technology shopping
                experience more convenient.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon

                return (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <section className="px-6 py-16 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let's Find Your Next Favorite Tech
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
              Explore our product collection or contact our team if you need
              help finding the right technology for your needs.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                <Link to="/products">Browse Products</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/60 bg-transparent text-white hover:bg-white hover:text-blue-700"
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
