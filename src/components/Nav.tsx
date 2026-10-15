import { Menu, ShoppingCartPlus, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ]
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }
  return (
    <>
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b-2 bg-white px-4 py-4 shadow-md md:px-10">
        <h1 className="text-2xl font-bold">Tech Haven</h1>

        <div className="ml-auto flex items-center gap-3 md:gap-5">
          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  `rounded-md px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isActive
                      ? "bg-blue-50 font-semibold text-blue-600 dark:bg-gray-800"
                      : "text-gray-700 dark:text-gray-200"
                  }`
                }
                key={link.path}
                to={link.path}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            aria-label="Shopping cart"
            className="relative rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ShoppingCartPlus className="h-5 w-5" />

            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              2
            </span>
          </button>

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
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
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden="true"
      />
      <aside
        id="mobile-sidebar"
        aria-label="Mobile navigation"
        aria-hidden={!isSidebarOpen}
        className={`fixed top-0 right-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden dark:bg-gray-950 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">Tech Haven</h2>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
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

              className={({ isActive }) =>
                `rounded-md px-4 py-3 shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive
                    ? "bg-blue-50 font-semibold text-blue-600 dark:bg-gray-800"
                    : "text-gray-700 dark:text-gray-200"
                }`
              }
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
