import { Menu, MoonStar, ShoppingCartPlus, Sun } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Toggle Function
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }
  return (
    <div className="fixed top-0 m-auto flex w-full place-items-center items-center justify-between border-b-2 px-10 py-4">
      <h1 className="text-2xl font-bold">Tech Haven</h1>
      <div className="flex items-center gap-5 max-sm:hidden">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>

        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <ShoppingCartPlus />

        <button
          onClick={toggleDarkMode}
          className="rounded-full border border-gray-300 p-2 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <MoonStar className="h-5 w-5 text-slate-700" />
          )}
        </button>
      </div>
      <div className="sm:hidden">
        <Menu />
      </div>
    </div>
  )
}

export default Navbar
