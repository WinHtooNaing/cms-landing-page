import { AnimatePresence, motion } from "motion/react"

import { useCartStore } from "@/store/cart-store"
import { Menu, ShoppingCartPlus, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import { useAuthStore } from "@/store/user-store"
import { Avatar, AvatarFallback } from "./ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const Navbar = () => {
  const cart = useCartStore((state) => state.cart)
  const user = useAuthStore((state) => state.user)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
      isActive
        ? "bg-white/20 text-primary font-semibold shadow-sm"
        : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
    }`

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-1/2 z-50 flex w-full -translate-x-1/2 items-center justify-between px-4 py-3 text-foreground shadow-md shadow-black/5 backdrop-blur-2xl md:px-20">
        {/* Logo */}
        <NavLink to="/" className="shrink-0">
          <img src={logo} alt="Logo" width={130} className="object-contain" />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-2">
          {user?.role === "CUSTOMER" && (
            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="relative rounded-full border border-white/20 bg-white/10 p-3 transition-all hover:bg-white/20"
            >
              <ShoppingCartPlus className="h-5 w-5" />

              {/* <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
              {cart.length}
            </span> */}
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={cart.length}
                  initial={{ scale: 0, opacity: 0, y: -8 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: 8 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  }}
                  className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground"
                >
                  {cart.length}
                </motion.span>
              </AnimatePresence>
            </Link>
          )}
          <div className="max-sm:hidden">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Avatar>
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                  }
                >
                  Open
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className={"text-red-500 hover:bg-red-500"}
                      onClick={() => useAuthStore.getState().setUser(null)}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-primary/20 bg-primary/10 p-3 transition-all hover:bg-primary/20"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="rounded-full border border-white/20 bg-white/10 p-3 transition-all hover:bg-white/20 md:hidden"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={isSidebarOpen}
            aria-controls="mobile-sidebar"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isSidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <aside
        id="mobile-sidebar"
        aria-label="Mobile navigation"
        aria-hidden={!isSidebarOpen}
        className={`fixed top-0 right-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col border-l border-white/20 bg-white/10 p-6 text-foreground shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="mb-10 flex items-center justify-between">
          <NavLink to="/" onClick={closeSidebar}>
            <img src={logo} alt="Logo" width={120} className="object-contain" />
          </NavLink>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-full border border-white/20 bg-white/10 p-2 hover:bg-white/20"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-3">
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
