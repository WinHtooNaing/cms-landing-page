import { Menu, ShoppingCartPlus } from "lucide-react"

import { NavLink } from "react-router-dom"
const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-white px-[10%] py-4 shadow-md">
      <h1 className="text-2xl font-bold">Tech Haven</h1>
      <div className="flex items-center gap-5 max-md:hidden">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>

        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <ShoppingCartPlus />
      </div>
      <div className="md:hidden">
        <Menu />
      </div>
    </div>
  )
}

export default Navbar
