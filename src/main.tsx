import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import App from "./App.tsx"
import { Toaster } from "./components/ui/sonner.tsx"
// import { ThemeProvider } from "@/components/theme-provider.tsx"
const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ThemeProvider> */}
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <App />
      </QueryClientProvider>
      <Toaster position="top-right" duration={3000} theme="light" richColors />
    </TooltipProvider>
    {/* </ThemeProvider> */}
  </StrictMode>
)
