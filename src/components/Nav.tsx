import { useCartStore } from "@/store/cart-store"
import { Menu, ShoppingCartPlus, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
const Navbar = () => {
  const cart = useCartStore((state) => state.cart)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-4 py-3 transition-colors  hover:text-accent-foreground ${
      isActive ? " font-semibold text-primary" : "text-muted-foreground"
    }`

  return (
    <>
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background px-4 py-4 text-foreground shadow-sm md:px-10">
        <NavLink to="/" className="text-2xl font-bold tracking-tight">
          <img src={logo} alt="logo" className="" width={150} />
        </NavLink>

        <div className="ml-auto flex items-center gap-3 md:gap-5">
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <NavLink className={navLinkClass} key={link.path} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            aria-label="Shopping cart"
            className="relative rounded-md p-2 transition-colors hover:bg-accent"
          >
            <Link to="/cart">
              <ShoppingCartPlus className="h-5 w-5" />

              <span className="absolute -top-1 -right-1 flex h-5 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
                {cart.length}
              </span>
            </Link>
          </button>

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-md p-2 transition-colors hover:bg-accent"
              aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
              aria-expanded={isSidebarOpen}
              aria-controls="mobile-sidebar"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden="true"
      />

      <aside
        id="mobile-sidebar"
        aria-label="Mobile navigation"
        aria-hidden={!isSidebarOpen}
        className={`fixed top-0 right-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col border-l border-border bg-background p-6 text-foreground shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <NavLink
            to="/"
            onClick={closeSidebar}
            className="text-xl font-bold tracking-tight"
          >
            <img src={logo} alt="logo" className="" width={150} />
          </NavLink>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-md p-2 transition-colors hover:bg-accent"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeSidebar}
              className={navLinkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  )
}

export default Navbar
