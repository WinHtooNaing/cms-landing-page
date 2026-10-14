import { Link } from "react-router-dom"
import { User, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ]

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "FAQs", path: "/faq" },
    { name: "Shipping Information", path: "/shipping" },
    { name: "Returns & Refunds", path: "/returns" },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      icon: User,
      href: "https://www.facebook.com/",
    },
    {
      name: "Instagram",
      icon: User,
      href: "https://www.instagram.com/",
    },
    {
      name: "GitHub",
      icon: User,
      href: "https://github.com/",
    },
  ]

  return (
    <footer className="bg-slate-950 text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand Section */}
          <div>
            <Link
              to="/"
              className="inline-block text-2xl font-bold tracking-tight text-white"
            >
              Tech <span className="text-blue-500">Haven</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Your trusted destination for modern technology. Discover quality
              electronics, explore the latest products, and find the right
              technology for your needs.
            </p>

            {/* Social Media */}
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
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 transition-all duration-200 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center gap-1 text-sm transition-colors hover:text-blue-400"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-white">
              Customer Support
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-white">
              Get in Touch
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                <a
                  href="mailto:support@techhaven.com"
                  className="text-sm break-all transition-colors hover:text-blue-400"
                >
                  support@techhaven.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                <a
                  href="tel:+959123456789"
                  className="text-sm transition-colors hover:text-blue-400"
                >
                  +95 9 123 456 789
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                <span className="text-sm leading-6">Yangon, Myanmar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:px-10 md:flex-row md:text-left">
          <p className="text-sm text-slate-400">
            © {currentYear} Tech Haven. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm">
            <Link
              to="/privacy"
              className="transition-colors hover:text-blue-400"
            >
              Privacy Policy
            </Link>

            <Link to="/terms" className="transition-colors hover:text-blue-400">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
