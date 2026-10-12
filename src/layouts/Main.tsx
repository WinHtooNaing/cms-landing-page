import Footer from "@/components/Footer"
import Navbar from "@/components/Nav"
import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <section className="">
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  )
}

export default Main
