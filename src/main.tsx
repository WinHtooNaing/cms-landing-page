import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./index.css"
import App from "./App.tsx"
import { Toaster } from "./components/ui/sonner.tsx"
// import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ThemeProvider> */}
    <TooltipProvider>
      <App />
      <Toaster position="top-right" duration={3000} theme="light" richColors />
    </TooltipProvider>
    {/* </ThemeProvider> */}
  </StrictMode>
)
