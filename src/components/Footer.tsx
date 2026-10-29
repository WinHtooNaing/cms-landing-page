import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa"
import { Phone, Mail, MapPin } from "lucide-react"
import logo from "../assets/logo.png"
const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ]

  const supportLinks = [
    { name: "Help Center", path: "/contact" },
    { name: "FAQs", path: "/contact" },
    { name: "Shipping Information", path: "/contact" },
    { name: "Returns & Refunds", path: "/contact" },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "https://www.facebook.com/",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://www.instagram.com/",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      href: "https://github.com/",
    },
  ]

  return (
    <footer className="mt-20 border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <Link
              to="/"
              className="inline-block text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-primary/80"
            >
              <img src={logo} alt="logo" width={150} />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
              Discover quality electronics, explore the latest products, and
              find the right technology for your needs.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-base font-semibold text-foreground">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-base font-semibold text-foreground">
              Support Links
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-base font-semibold text-foreground">
              Get in Touch
            </h3>

            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />

                <a
                  href="mailto:support@techhaven.com"
                  className="text-sm break-all transition-colors hover:text-primary"
                >
                  support@techhaven.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />

                <a
                  href="tel:+959123456789"
                  className="text-sm transition-colors hover:text-primary"
                >
                  +95 9 123 456 789
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />

                <span className="text-sm leading-6 hover:text-primary">
                  Yangon, Myanmar
                </span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent hover:text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:px-10 md:flex-row md:text-left">
          <p className="text-sm text-primary">
            © {currentYear} Tech Haven. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm">
            <Link
              to="/contact"
              className="text-primary transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>

            <Link
              to="/contact"
              className="text-primary transition-colors hover:text-foreground"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
