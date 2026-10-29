import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Contactpage = () => {
  const contactDetails = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime.",
      value: "support@techhaven.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Our team is ready to help.",
      value: "+95 9 123 456 789",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come and visit our store.",
      value: "Yangon, Myanmar",
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "We're available during:",
      value: "Mon – Fri, 8:30 AM – 5:00 PM",
    },
  ]

  return (
    <main className="min-h-screen bg-background px-4 pt-28 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
            <MessageCircle className="h-4 w-4" />
            We'd Love to Hear From You
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Contact <span className="text-primary">Us</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Have a question about our products or need help with an order? Our
            team at Tech Haven is here to help you find the right technology for
            your needs.
          </p>
        </div>

        {/* Contact Information and Form */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Information */}
          <section className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
              <h2 className="mb-3 text-2xl font-bold">Get in Touch</h2>

              <p className="mb-8 leading-7 text-muted-foreground">
                Whether you have questions, feedback, or need assistance, we're
                always happy to hear from you.
              </p>

              <div className="space-y-7">
                {contactDetails.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-accent">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="mb-1 font-semibold">{item.title}</h3>

                        <p className="mb-1 text-sm text-muted-foreground">
                          {item.description}
                        </p>

                        <p className="text-sm font-medium wrap-break-word">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-10 border-t border-border pt-6">
                <p className="text-sm leading-6 text-muted-foreground">
                  Your satisfaction matters to us. Let us know how we can make
                  your Tech Haven experience better.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="lg:col-span-3">
            <Card className="h-full rounded-2xl border-border bg-card shadow-sm">
              <CardHeader className="p-6 sm:p-8">
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>

                <CardDescription className="text-base">
                  Fill out the form below and tell us how we can help.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-8 sm:px-8">
                <form
                  className="space-y-5"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>

                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>

                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>

                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is your message about?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Your Message
                    </label>

                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Write your message here..."
                      required
                      minLength={10}
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 py-6 text-base sm:w-auto"
                  >
                    Send Message
                  </Button>

                  <p className="text-xs leading-5 text-muted-foreground">
                    We'll use your information to respond to your inquiry.
                  </p>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Additional Help */}
        <div className="mt-12 rounded-2xl border border-border bg-muted p-6 text-center sm:p-8">
          <h2 className="mb-2 text-xl font-bold text-foreground">
            Still Have Questions?
          </h2>

          <p className="text-muted-foreground">
            We're happy to help you find the right products and solutions for
            your needs.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Contactpage
