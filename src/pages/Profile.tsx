import { getProfile, updateProfile, type ProfileProps } from "@/api/profile"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useAuthStore } from "@/store/user-store"
import { profileSchema, type ProfileFormValues } from "@/types/profileSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const Profile = () => {
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", phone: "" },
  })

  useEffect(() => {
    if (profileQuery.data) {
      form.reset({
        name: profileQuery.data.data.name,
        phone: profileQuery.data.data.phone,
      })
    }
  }, [profileQuery.data, form])

  const updateMutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const profile = profileQuery.data
      if (!profile) throw new Error("Profile is not available.")
      return updateProfile(values)
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData<ProfileProps>(["profile"], updatedProfile)
      if (user) setUser({ ...user, ...updatedProfile })
      form.reset({
        name: updatedProfile.name,
        phone: updatedProfile.phone,
      })
      toast.success("Profile updated successfully.")
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update your profile."
      )
    },
  })

  if (profileQuery.isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="size-6" />
        <span className="sr-only">Loading profile</span>
      </main>
    )
  }

  if (profileQuery.isError) {
    return (
      <main className="mx-auto mt-20 max-w-3xl px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Unable to load your profile</CardTitle>
            <CardDescription>
              Check your connection and try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              type="button"
              variant="outline"
              onClick={() => void profileQuery.refetch()}
              disabled={profileQuery.isFetching}
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="relative mt-20 min-h-[70vh] overflow-hidden px-4 py-10 sm:px-6">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 left-[10%] size-80 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-1/3 right-0 size-96 rounded-full bg-primary/20 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="text-sm font-semibold text-primary">Your account</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Profile settings
          </h1>
          <p className="mt-2 text-muted-foreground">
            Update the contact information associated with your account.
          </p>
        </header>

        <Card className="border-white/60 bg-white/40 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
            <CardDescription>
              Your email and phone number are used for account communication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit((values) =>
                updateMutation.mutate(values)
              )}
            >
              <FieldGroup>
                <Field data-invalid={Boolean(form.formState.errors.name)}>
                  <FieldLabel htmlFor="profile-name">Name</FieldLabel>
                  <Input
                    id="profile-name"
                    autoComplete="name"
                    aria-invalid={Boolean(form.formState.errors.name)}
                    defaultValue={profileQuery.data?.data.name ?? ""}
                    {...form.register("name")}
                  />
                  <FieldError>{form.formState.errors.name?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="profile-email">Email</FieldLabel>
                  <Input
                    id="profile-email"
                    type="email"
                    autoComplete="email"
                    defaultValue={profileQuery.data?.data.email ?? ""}
                    disabled
                    readOnly
                  />
                </Field>

                <Field data-invalid={Boolean(form.formState.errors.phone)}>
                  <FieldLabel htmlFor="profile-phone">Phone number</FieldLabel>
                  <Input
                    id="profile-phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={Boolean(form.formState.errors.phone)}
                    defaultValue={profileQuery.data?.data.phone ?? ""}
                    {...form.register("phone")}
                  />
                  <FieldError>
                    {form.formState.errors.phone?.message}
                  </FieldError>
                </Field>
              </FieldGroup>

              <div className="mt-6 flex justify-end">
                <Button
                  type="submit"
                  disabled={
                    !form.formState.isDirty ||
                    updateMutation.isPending ||
                    profileQuery.isFetching
                  }
                >
                  {updateMutation.isPending && (
                    <Spinner className="mr-2 size-4" />
                  )}
                  Save changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Profile
