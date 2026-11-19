import Footer from "@/components/Footer"
import Navbar from "@/components/Nav"
import ScrollToTop from "@/components/ScrollToTop"
import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <section className="">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  )
}

export default Main
