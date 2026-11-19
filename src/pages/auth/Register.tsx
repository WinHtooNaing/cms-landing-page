import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "motion/react"
import { Lock, Mail, Phone, UserRound } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { registerSchema } from "@/types/authSchema"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { register } from "@/api/auth"
import { useState } from "react"
import { toast } from "sonner"
import { useAuthStore } from "@/store/user-store"
import { useEffect } from "react"
const Register = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  })
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true)
      const response = await register(data)
      if (response.success) {
        toast.success("Account created successfully!")
        navigate("/login")
      } else {
        throw new Error(response.message || "Registration failed")
      }
      setIsLoading(false)
    } catch (err) {
      toast.error(
        (err as Error).message || "An error occurred during registration"
      )
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 right-10 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute -top-20 left-10 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-10 left-0 h-96 w-96 rounded-full bg-primary/30 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <div className="rounded-3xl border border-white/50 bg-white/30 p-6 shadow-2xl shadow-black/5 backdrop-blur-2xl sm:p-9 dark:border-white/10 dark:bg-white/5">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Join Tech Haven and discover your next favorite tech.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-medium">
                      Name
                    </FieldLabel>
                    <div className="relative">
                      <UserRound className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
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
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-medium">
                      Phone Number
                    </FieldLabel>
                    <div className="relative">
                      <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        type="number"
                        name="phone"
                        placeholder="Enter your phone number"
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
                    <FieldLabel className="text-sm font-medium">
                      Password
                    </FieldLabel>
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
            </FieldGroup>

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="mt-3 h-12 w-full rounded-xl text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
                disabled={isLoading}
              >
                {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
                Create Account
              </Button>
            </motion.div>
          </form>

          {/* Footer */}
          <div className="mt-7 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary transition-colors hover:text-primary/70"
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Register
