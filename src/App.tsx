import Main from "./layouts/Main"
import Aboutpage from "./pages/About"
import Homepage from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Productspage from "./pages/Products"
import Contactpage from "./pages/Contact"
import ProductDetails from "./pages/ProductDetails"
import AddToCart from "./pages/AddToCart"

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "/about",
          element: <Aboutpage />,
        },
        {
          path: "/products",
          element: <Productspage />,
        },
        {
          path: "/contact",
          element: <Contactpage />,
        },
        {
          path: "/products/:id",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: <AddToCart />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
