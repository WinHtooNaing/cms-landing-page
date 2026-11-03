import Main from "./layouts/Main"
import Aboutpage from "./pages/About"
import Homepage from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Productspage from "./pages/Products"
import Contactpage from "./pages/Contact"
import ProductDetails from "./pages/ProductDetails"
import AddToCart from "./pages/AddToCart"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import AuthProvider from "./provider/AuthProvider"

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <Main />
        </AuthProvider>
      ),
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
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <Main />,
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
