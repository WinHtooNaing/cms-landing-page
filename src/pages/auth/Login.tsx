import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "motion/react"
import { Lock, Mail } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { loginSchema } from "@/types/authSchema"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { login } from "@/api/auth"
import { Spinner } from "@/components/ui/spinner"
import { useAuthStore } from "@/store/user-store"
const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const requestedDestination = (location.state as { from?: string } | null)
    ?.from
  const destination =
    requestedDestination?.startsWith("/") &&
    !requestedDestination.startsWith("//")
      ? requestedDestination
      : "/"
  const user = useAuthStore((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useAuthStore((state) => state.setUser)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true)
      const response = await login(data)
      console.log("login response ", response.data)
      const { accessToken, refreshToken, user } = response.data
      const { id, name, email, phone, role } = user
      if (response.success) {
        if (role !== "CUSTOMER") {
          throw new Error("Something went wrong")
        } else {
          localStorage.setItem("accessToken", accessToken)
          localStorage.setItem("refreshToken", refreshToken)

          setUser({
            id,
            name,
            email,
            phone,
            role,
          })
          setIsLoading(false)
          toast.success("Account created successfully!")
          navigate(destination, { replace: true })
        }
      } else {
        throw new Error(response.message || "Login failed")
      }
    } catch (err) {
      toast.error((err as Error).message || "An error occurred during Login")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      navigate(destination, { replace: true })
    }
  }, [user, navigate, destination])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-20 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-primary/30 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/50 bg-white/30 p-6 shadow-2xl shadow-black/5 backdrop-blur-2xl sm:p-9 dark:border-white/10 dark:bg-white/5">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue shopping at Tech Haven.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-medium">
                      Email{" "}
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        type="text"
                        name="email"
                        placeholder="Enter your email address"
                        className={`${fieldState.invalid ? "border-red-500" : ""} h-12 rounded-xl bg-white/30 pl-10 backdrop-blur-xl focus-visible:border-primary focus-visible:ring-primary/50`}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel className="text-sm font-medium">
                        Password
                      </FieldLabel>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-primary transition-colors hover:text-primary/70"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        type="text"
                        name="password"
                        placeholder="Enter your Password"
                        className={`${fieldState.invalid ? "border-red-500" : ""} h-12 rounded-xl bg-white/30 pl-10 backdrop-blur-xl focus-visible:border-primary focus-visible:ring-primary/50`}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
                  disabled={isLoading}
                >
                  {isLoading && <Spinner className="mr-2 h-4 w-4" />}
                  Sign In
                </Button>
              </motion.div>
            </FieldGroup>
          </form>

          {/* Footer */}
          <div className="mt-7 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary transition-colors hover:text-primary/70"
            >
              Create account
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </section>
  )
}

export default Login
