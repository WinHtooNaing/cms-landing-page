import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa"
import { Phone, Mail, MapPin } from "lucide-react"
const Footer = () => {
  const currentYear = new Date().getFullYear()
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ]
  const supportLinks = [
    { name: "Help Center", path: "/" },
    { name: "FAQs", path: "/" },
    { name: "Shipping Information", path: "/" },
    { name: "Returns & Refunds", path: "/" },
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
    <footer className="bg-slate-1000 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-7 sm:px-10 lg:py-7">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <Link
              to="/"
              className="inline-block text-2xl font-bold tracking-tight text-slate-400"
            >
              Tech Haven
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Your trusted destination for modern technology. Discover quality
              electronics, explore the latest products, and find the right
              technology for your needs.
            </p>
          </div>
          <div>
            <h3 className="mb-5 text-base font-semibold text-slate-400">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-base font-semibold text-slate-400">
              Support Links
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-base font-semibold text-slate-400">
              Get in Touch
            </h3>

            <ul className="space-y-4 text-slate-400">
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
                    className="hover:bg-blue-60 border-blue flex h-10 w-10 items-center justify-center rounded-lg border text-blue-400 transition-all duration-200 hover:text-blue-500"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:px-10 md:flex-row md:text-left">
          <p className="text-sm text-slate-400">
            © {currentYear} Tech Haven. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm">
            <Link to="/contact" className="text-slate-400 hover:text-blue-400">
              Privacy Policy
            </Link>

            <Link to="/contact" className="text-slate-400 hover:text-blue-400">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
