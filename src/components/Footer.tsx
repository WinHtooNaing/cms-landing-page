import { Link } from "react-router-dom"

import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaTiktok,
  FaLinkedin,
} from "react-icons/fa"

import { FaXTwitter } from "react-icons/fa6"

import { Phone, Mail, MapPin } from "lucide-react"

import { useQuery } from "@tanstack/react-query"

import logo from "../assets/logo.png"

import { getFooterSection, type FooterItem } from "@/api/cms.footer"

import { getContactSection } from "@/api/cms.contact"
import { getLogoSection } from "@/api/cms.logo"

// Social media icon mapping
const socialIcons: Record<string, React.ElementType> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  github: FaGithub,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  linkedin: FaLinkedin,
  x: FaXTwitter,
}

// Contact icon mapping
const contactIcons = {
  email: Mail,
  phone: Phone,
  address: MapPin,
}

// Support Link Component
const SupportLink = ({ item }: { item: FooterItem }) => {
  const { name, url, pageKey, destinationType } = item.content

  const className =
    "inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"

  if (destinationType === "internal" && pageKey) {
    const path = pageKey === "home" ? "/" : `/${pageKey}`

    return (
      <Link to={path} className={className}>
        {name}
      </Link>
    )
  }

  if (destinationType === "external" && url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {name}
      </a>
    )
  }

  return null
}

const Footer = () => {
   const { data: siteSettings } = useQuery({
      queryKey: ["site-settings"],
      queryFn: getLogoSection,
      staleTime: 0,
      refetchInterval: 30 * 1000,
    })
  
    const headerSection = siteSettings?.data.sections.find(
      (section) => section.key === "header"
    )
  
    const logoUrl = headerSection?.imageUrl || logo


  // Footer CMS Query
  const {
    data: footer,
    isPending: isFooterPending,
    isError: isFooterError,
  } = useQuery({
    queryKey: ["footer"],
    queryFn: getFooterSection,
  })

  // Contact CMS Query
  const { data: contactInfo, isPending: isContactPending } = useQuery({
    queryKey: ["contact-us"],
    queryFn: async () => {
      const response = await getContactSection()
      return response.data.sections[0]?.content
    },
  })

  // Find footer sections
  const sections = footer?.sections ?? []

  const description = sections.find((section) => section.key === "description")

  const supportLinks = sections.find(
    (section) => section.key === "support-links"
  )

  const socialMedia = sections.find((section) => section.key === "social-media")

  // Quick Links
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ]

  // Contact Details
  const contactDetails = [
    {
      key: "email",
      icon: contactIcons.email,
      title: contactInfo?.emailTitle,
      description: contactInfo?.emailDescription,
      value: contactInfo?.email,
      href: contactInfo?.email ? `mailto:${contactInfo.email}` : undefined,
    },
    {
      key: "phone",
      icon: contactIcons.phone,
      title: contactInfo?.phoneTitle,
      description: contactInfo?.phoneDescription,
      value: contactInfo?.phone,
      href: contactInfo?.phone
        ? `tel:${contactInfo.phone.replace(/\s+/g, "")}`
        : undefined,
    },
    {
      key: "address",
      icon: contactIcons.address,
      title: contactInfo?.addressTitle,
      description: contactInfo?.addressDescription,
      value: contactInfo?.address,
    },
  ]

  const currentYear = new Date().getFullYear()

  // Footer Loading State
  if (isFooterPending) {
    return (
      <footer className="mt-20 border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm text-muted-foreground">
            Loading footer...
          </p>
        </div>
      </footer>
    )
  }

  // Footer Error State
  if (isFooterError) {
    return null
  }

  return (
    <footer className="mt-20 border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Description */}
          <div>
            <Link
              to="/"
              className="inline-block text-2xl font-bold tracking-tight"
            >
              <img src={logoUrl} alt="Tech Haven" width={150} />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
              {description?.content.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Quick Links</h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Support Links</h3>

            <ul className="space-y-3">
              {[...(supportLinks?.items ?? [])]
                .sort((a, b) => a.position - b.position)
                .map((item) => (
                  <li key={`${item.position}-${item.content.name}`}>
                    <SupportLink item={item} />
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Get in Touch</h3>

            {isContactPending ? (
              <p className="text-sm text-muted-foreground">
                Loading contact information...
              </p>
            ) : (
              <ul className="space-y-4">
                {contactDetails.map((contact) => {
                  const Icon = contact.icon

                  if (!contact.value) return null

                  return (
                    <li key={contact.key} className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />

                      <div>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="mt-1 block text-sm break-all text-muted-foreground transition-colors hover:text-primary"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {contact.value}
                          </p>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-3">
              {[...(socialMedia?.items ?? [])]
                .sort((a, b) => a.position - b.position)
                .map((item) => {
                  const platform = item.content.platform?.toLowerCase()

                  const Icon = platform ? socialIcons[platform] : undefined

                  if (!Icon || !item.content.url) return null

                  return (
                    <a
                      key={`${platform}-${item.position}`}
                      href={item.content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
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

      {/* Copyright */}
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
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
