import {
  deleteAddToCart,
  deleteAddToCartById,
  getAddToCartItems,
  updateQuantity,
  type createAddToCartProps,
} from "@/api/addToCart"
import {
  createOrder,
  submitManualPayment,
  type CreateOrderPayload,
  type ManualPaymentPayload,
} from "@/api/orders"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { orderCheckoutSchema } from "@/types/orderSchema"
import type * as z from "zod"
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Trash,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useRef, useState } from "react"

import { Link } from "react-router-dom"
import { toast } from "sonner"
import axios from "axios"

type CheckoutPayload = {
  order: CreateOrderPayload
  manualPayment: ManualPaymentPayload
  existingOrderId?: string
}

type CheckoutFormValues = z.input<typeof orderCheckoutSchema>

class ManualPaymentSubmissionError extends Error {
  readonly orderId: string

  constructor(orderId: string, message: string, cause: unknown) {
    super(message, { cause })
    this.orderId = orderId
  }
}

const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message
  }
  return error instanceof Error ? error.message : "Something went wrong."
}

const AddToCart = () => {
  const queryClient = useQueryClient()
  const [subtotal, setSubtotal] = useState(0)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [pendingManualOrderId, setPendingManualOrderId] = useState<
    string | null
  >(null)
  const paymentImageInputRef = useRef<HTMLInputElement>(null)
  const form = useForm({
    defaultValues: {
      shippingName: "",
      shippingPhone: "",
      shippingAddress: "",
      note: "",
      providerCode: "KBZ_PAY",
      transactionReference: "",
      image: null,
    } as CheckoutFormValues,
    validators: {
      onSubmit: orderCheckoutSchema,
    },
    onSubmit: async ({ value }) => {
      if (!(value.image instanceof File)) {
        return
      }

      checkoutMutation.mutate({
        order: {
          paymentMethod: "MANUAL",
          shippingName: value.shippingName.trim(),
          shippingPhone: value.shippingPhone.trim(),
          shippingAddress: value.shippingAddress.trim(),
          note: value.note.trim(),
          items: (data ?? []).map(({ productId, quantity }) => ({
            productId,
            quantity,
          })),
        },
        manualPayment: {
          providerCode: value.providerCode,
          transactionReference: value.transactionReference.trim(),
          image: value.image,
        },
        existingOrderId: pendingManualOrderId ?? undefined,
      })
    },
  })

  // get all data
  const getData = async () => {
    const response = await getAddToCartItems()
    setSubtotal(response.data.subtotal)
    return response.data.items
  }

  const { data, isPending } = useQuery({
    queryKey: ["addToCart"],
    queryFn: getData,
  })
  // clear all data
  const clearCart = async () => {
    try {
      const response = await deleteAddToCart()
      if (response.success) {
        toast.success("clear all done")
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error("something went wrong")
      console.log(err)
    }
  }
  // clear by id
  const clearCartById = async (id: string) => {
    try {
      const response = await deleteAddToCartById(id)
      if (response.success) {
        toast.success("clear  done")
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error("something went wrong")
      console.log(err)
    }
  }
  const updateQty = async (payload: createAddToCartProps) => {
    try {
      const response = await updateQuantity(payload)
      console.log("response", response)
      console.log("payload", payload.productId)
      if (response.success) {
        console.log("done")
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error("something went wrong")
      console.log(err)
    }
  }
  const mutationAll = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addToCart"],
      })
    },
  })
  const mutationById = useMutation({
    mutationFn: (id: string) => clearCartById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addToCart"],
      })
    },
  })
  const mutationQty = useMutation({
    mutationFn: (payload: createAddToCartProps) => updateQty(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addToCart"],
      })
    },
  })
  const checkoutMutation = useMutation({
    mutationFn: async ({
      order,
      manualPayment,
      existingOrderId,
    }: CheckoutPayload) => {
      let orderId = existingOrderId
      if (!orderId) {
        const response = await createOrder(order)
        if (response.success === false) {
          throw new Error(response.message ?? "Could not create the order.")
        }

        orderId =
          response.orderId ?? response.data?.orderId ?? response.data?.id
        if (!orderId) {
          throw new Error("The order response did not include an order ID.")
        }
      }

      if (manualPayment) {
        try {
          const paymentResponse = await submitManualPayment(
            orderId,
            manualPayment
          )
          if (paymentResponse.success === false) {
            throw new Error(
              paymentResponse.message ?? "Could not submit the payment."
            )
          }
        } catch (error) {
          throw new ManualPaymentSubmissionError(
            orderId,
            `Order  was created, but payment submission failed: ${getApiErrorMessage(error)}`,
            error
          )
        }
      }

      let cartCleared = false
      let cartClearError: string | undefined
      try {
        const clearResponse = await deleteAddToCart()
        if (clearResponse.success) {
          cartCleared = true
        } else {
          cartClearError =
            clearResponse.message ?? "The cart could not be cleared."
        }
      } catch (error) {
        cartClearError = getApiErrorMessage(error)
      }

      return { orderId, cartCleared, cartClearError }
    },

    onSuccess: async ({ cartCleared, cartClearError }) => {
      toast.success(`Order have been successfully!`)
      if (!cartCleared) {
        toast.error(
          `Order was placed, but the cart could not be cleared: ${cartClearError ?? "Please clear it manually."}`
        )
      }
      setPendingManualOrderId(null)
      setIsCheckoutOpen(false)
      form.reset()
      if (paymentImageInputRef.current) {
        paymentImageInputRef.current.value = ""
      }
      await queryClient.invalidateQueries({ queryKey: ["addToCart"] })
    },
    onError: (error) => {
      if (error instanceof ManualPaymentSubmissionError) {
        setPendingManualOrderId(error.orderId)
      }
      toast.error(getApiErrorMessage(error))
    },
  })

  const handleCheckout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    void form.handleSubmit()
  }

  if (isPending) return <p>loading</p>

  return (
    <section className="relative mt-24 min-h-screen overflow-hidden px-4 pb-20 md:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-10 h-80 w-80 rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute top-80 right-0 h-96 w-96 rounded-full bg-violet-400/20 blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-cyan-300/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Empty cart */}
        {data && data.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl pt-10"
          >
            <Card className="rounded-3xl border border-white/50 bg-white/30 py-12 text-center shadow-xl shadow-black/5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
              <CardContent className="flex flex-col items-center gap-6 px-6">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-24 w-24 items-center justify-center rounded-full border border-white/50 bg-white/40 text-primary shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
                >
                  <ShoppingBag className="h-11 w-11" />
                </motion.div>

                <div className="space-y-3">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Your cart is empty
                  </h1>
                  <p className="text-muted-foreground">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                </div>

                <Link to="/products">
                  <Button size="lg" className="gap-2 rounded-full">
                    <ArrowLeft className="h-4 w-4" />
                    Continue shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Page heading */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-end justify-between gap-4"
            >
              <div>
                <p className="mb-2 text-sm font-medium tracking-[0.2em] text-primary uppercase">
                  Shopping bag
                </p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                  Your cart
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {data && data.length}{" "}
                  {data && data.length === 1 ? "item" : "items"} in your cart
                </p>
              </div>

              <Button
                type="button"
                onClick={() => mutationAll.mutate()}
                variant="destructive"
                className="gap-2 rounded-full"
                disabled={mutationAll.isPending}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Clear cart</span>
              </Button>
            </motion.div>

            <div className="grid items-start gap-8 lg:grid-cols-[2fr_1fr]">
              {/* Cart items */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-5"
              >
                <AnimatePresence mode="popLayout">
                  {data &&
                    data.map((item, index) => (
                      <motion.div
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, y: 25, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          x: 60,
                          scale: 0.9,
                          transition: { duration: 0.25 },
                        }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.06,
                          layout: { duration: 0.3 },
                        }}
                      >
                        <Card className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/30 shadow-lg shadow-black/5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl dark:border-white/10 dark:bg-white/5">
                          {/* Subtle card highlight */}
                          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                          <Button
                            type="button"
                            onClick={() => mutationById.mutate(item.productId)}
                            disabled={mutationById.isPending}
                            variant="destructive"
                            size="icon"
                            aria-label={`Remove ${item.name} from cart`}
                            className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>

                          <CardContent className="relative flex flex-col gap-5 p-4 sm:p-5 md:flex-row">
                            {/* Product image */}
                            <Link
                              to={`/products/${item.productId}`}
                              className="block shrink-0 overflow-hidden rounded-2xl border border-white/30 bg-white/20 md:w-40 dark:border-white/10"
                            >
                              <motion.img
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.4 }}
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-40 w-full object-cover md:h-36 md:w-40"
                              />
                            </Link>

                            {/* Product details */}
                            <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
                              <div className="min-w-0 flex-1">
                                {item.slug && (
                                  <span className="mb-2 inline-flex rounded-full border border-primary/10 bg-primary/10 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-primary uppercase">
                                    {item.slug}
                                  </span>
                                )}

                                <Link
                                  to={`/products/${item.productId}`}
                                  className="block"
                                >
                                  <h2 className="line-clamp-2 text-lg font-semibold tracking-tight transition-colors hover:text-primary sm:text-xl">
                                    {item.name}
                                  </h2>
                                </Link>

                                {item.slug && (
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    {item.slug}
                                  </p>
                                )}

                                <div className="mt-4 flex items-center gap-3">
                                  <motion.span
                                    key={item.currentUnitPrice * item.quantity}
                                    initial={{ scale: 1.15, opacity: 0.5 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-lg font-bold text-foreground"
                                  >
                                    {(
                                      item.currentUnitPrice * item.quantity
                                    ).toLocaleString()}{" "}
                                    Ks
                                  </motion.span>

                                  {item.currentUnitPrice !== undefined &&
                                    item.currentUnitPrice >
                                      item.currentUnitPrice && (
                                      <span className="text-sm text-muted-foreground line-through">
                                        {(
                                          item.currentUnitPrice * item.quantity
                                        ).toLocaleString()}{" "}
                                        Ks
                                      </span>
                                    )}
                                </div>
                              </div>

                              {/* Quantity controls */}
                              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                                <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/30 p-1 shadow-inner backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                                  <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    type="button"
                                    onClick={() =>
                                      mutationQty.mutate({
                                        productId: item.productId,
                                        quantity: item.quantity - 1,
                                      })
                                    }
                                    disabled={
                                      mutationQty.isPending || item.quantity < 1
                                    }
                                    aria-label={`Decrease quantity for ${item.name}`}
                                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/60 dark:hover:bg-white/10 ${mutationQty.isPending || item.quantity < 1 ? "pointer-events-none cursor-not-allowed" : ""}`}
                                  >
                                    <Minus className={`h-4 w-4`} />
                                  </motion.button>

                                  <AnimatePresence mode="popLayout">
                                    <motion.span
                                      key={item.quantity}
                                      initial={{
                                        opacity: 0,
                                        y: -8,
                                        scale: 0.8,
                                      }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, y: 8, scale: 0.8 }}
                                      className="min-w-8 text-center text-sm font-semibold"
                                    >
                                      {item.quantity}
                                    </motion.span>
                                  </AnimatePresence>

                                  <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    type="button"
                                    onClick={() =>
                                      mutationQty.mutate({
                                        productId: item.productId,
                                        quantity: item.quantity + 1,
                                      })
                                    }
                                    disabled={mutationQty.isPending}
                                    aria-label={`Increase quantity for ${item.name}`}
                                    className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/60 dark:hover:bg-white/10"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </motion.div>

              {/* Order summary */}
              <motion.aside
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:sticky lg:top-28"
              >
                <Card className="overflow-hidden rounded-3xl border border-white/50 bg-white/30 shadow-xl shadow-black/5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
                  <CardHeader className="border-b border-white/30 pb-5 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <ShoppingBag className="h-5 w-5" />
                      </div>

                      <div>
                        <CardTitle className="text-2xl">
                          Order summary
                        </CardTitle>
                        <CardDescription>
                          Everything in your shopping bag.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5 p-5">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <motion.span
                          key={1}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-medium text-foreground"
                        >
                          {subtotal.toLocaleString()} KsKs
                        </motion.span>
                      </div>

                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>Delivery</span>
                        <span className="font-medium text-emerald-500">
                          Free
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>Tax</span>
                        <span className="font-medium text-foreground">
                          Included
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-white/40 pt-4 dark:border-white/10">
                      <div className="flex items-center justify-between text-base font-semibold">
                        <span>Total</span>
                        <motion.span
                          key={`total-${subtotal}`}
                          initial={{ scale: 1.08, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          {subtotal.toLocaleString()} Ks
                        </motion.span>
                      </div>

                      <Dialog
                        open={isCheckoutOpen}
                        onOpenChange={setIsCheckoutOpen}
                      >
                        <DialogTrigger
                          render={
                            <Button
                              size="lg"
                              className="mt-5 w-full rounded-full shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
                            >
                              Proceed to checkout
                            </Button>
                          }
                        />

                        <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-3xl border border-white/40 bg-background/80 shadow-2xl backdrop-blur-2xl sm:max-w-2xl dark:border-white/10">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                              Checkout
                            </DialogTitle>
                            <DialogDescription>
                              Complete your details to place your order.
                            </DialogDescription>
                          </DialogHeader>

                          <form onSubmit={handleCheckout}>
                            <div className="space-y-4 py-4">
                              {pendingManualOrderId && (
                                <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-800 dark:text-amber-200">
                                  Order {pendingManualOrderId} already exists.
                                  Submitting again will retry its payment, not
                                  create another order.
                                </p>
                              )}
                              <div className="grid gap-4 sm:grid-cols-2">
                                <form.Field name="shippingName">
                                  {(field) => (
                                    <Field>
                                      <FieldLabel htmlFor={field.name}>
                                        Your name
                                      </FieldLabel>
                                      <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                          field.handleChange(event.target.value)
                                        }
                                        placeholder="Your name"
                                        aria-invalid={
                                          field.state.meta.errors.length > 0
                                        }
                                      />
                                      <FieldError
                                        errors={field.state.meta.errors}
                                      />
                                    </Field>
                                  )}
                                </form.Field>

                                <form.Field name="shippingPhone">
                                  {(field) => (
                                    <Field>
                                      <FieldLabel htmlFor={field.name}>
                                        Phone number
                                      </FieldLabel>
                                      <Input
                                        id={field.name}
                                        name={field.name}
                                        type="tel"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                          field.handleChange(event.target.value)
                                        }
                                        placeholder="09 123 456 789"
                                        aria-invalid={
                                          field.state.meta.errors.length > 0
                                        }
                                      />
                                      <FieldError
                                        errors={field.state.meta.errors}
                                      />
                                    </Field>
                                  )}
                                </form.Field>
                              </div>

                              <form.Field name="shippingAddress">
                                {(field) => (
                                  <Field>
                                    <FieldLabel htmlFor={field.name}>
                                      Delivery address
                                    </FieldLabel>
                                    <Textarea
                                      id={field.name}
                                      name={field.name}
                                      value={field.state.value}
                                      onBlur={field.handleBlur}
                                      onChange={(event) =>
                                        field.handleChange(event.target.value)
                                      }
                                      placeholder="No. 12, Main Street, Yangon"
                                      aria-invalid={
                                        field.state.meta.errors.length > 0
                                      }
                                      className="min-h-24 resize-none rounded-xl border-white/40 bg-white/30 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                                    />
                                    <FieldError
                                      errors={field.state.meta.errors}
                                    />
                                  </Field>
                                )}
                              </form.Field>

                              <form.Field name="note">
                                {(field) => (
                                  <Field>
                                    <FieldLabel htmlFor={field.name}>
                                      Order note{" "}
                                      <span className="text-muted-foreground">
                                        (optional)
                                      </span>
                                    </FieldLabel>
                                    <Textarea
                                      id={field.name}
                                      name={field.name}
                                      value={field.state.value}
                                      onBlur={field.handleBlur}
                                      onChange={(event) =>
                                        field.handleChange(event.target.value)
                                      }
                                      placeholder="Any delivery instructions?"
                                      aria-invalid={
                                        field.state.meta.errors.length > 0
                                      }
                                      className="min-h-20 resize-none rounded-xl border-white/40 bg-white/30 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                                    />
                                    <FieldError
                                      errors={field.state.meta.errors}
                                    />
                                  </Field>
                                )}
                              </form.Field>

                              <div className="space-y-2">
                                <span className="text-sm font-medium">
                                  Choose how to pay
                                </span>
                                <form.Field name="providerCode">
                                  {(field) => (
                                    <div
                                      className="grid gap-3 sm:grid-cols-2"
                                      role="group"
                                      aria-label="Payment provider"
                                    >
                                      {(
                                        [
                                          {
                                            code: "KBZ_PAY",
                                            name: "KBZ Pay",
                                            detail: "Pay with KBZPay",
                                            mark: "K",
                                            colors:
                                              "bg-blue-600 text-white shadow-blue-600/20",
                                          },
                                          {
                                            code: "WAVE_MONEY",
                                            name: "Wave Pay",
                                            detail: "Pay with Wave Money",
                                            mark: "W",
                                            colors:
                                              "bg-yellow-500 text-white shadow-yellow-500/20",
                                          },
                                        ] as const
                                      ).map((provider) => {
                                        const selected =
                                          field.state.value === provider.code
                                        return (
                                          <button
                                            key={provider.code}
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() =>
                                              field.handleChange(provider.code)
                                            }
                                            className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                                              selected
                                                ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                                                : "border-border bg-card/60 hover:border-primary/40"
                                            }`}
                                          >
                                            <span
                                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-bold shadow-lg ${provider.colors}`}
                                            >
                                              {provider.mark}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                              <span className="block font-semibold">
                                                {provider.name}
                                              </span>
                                              <span className="mt-0.5 block text-xs text-muted-foreground">
                                                {provider.detail}
                                              </span>
                                            </span>
                                            <span
                                              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                                selected
                                                  ? "border-primary bg-primary text-primary-foreground"
                                                  : "border-muted-foreground/30"
                                              }`}
                                            >
                                              {selected && (
                                                <Check className="h-3 w-3" />
                                              )}
                                            </span>
                                          </button>
                                        )
                                      })}
                                      <FieldError
                                        errors={field.state.meta.errors}
                                      />
                                    </div>
                                  )}
                                </form.Field>
                              </div>

                              <form.Subscribe
                                selector={(state) => state.values.providerCode}
                              >
                                {(selectedProvider) => (
                                  <div className="grid gap-4 rounded-2xl border border-primary/10 bg-linear-to-br from-primary/5 via-background to-violet-500/5 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
                                    <div className="relative mx-auto w-full max-w-44 overflow-hidden rounded-xl border bg-white p-2 shadow-sm">
                                      <img
                                        src={
                                          selectedProvider === "KBZ_PAY"
                                            ? "/kbz-pay-demo-qr.svg"
                                            : "/wave-pay-demo-qr.svg"
                                        }
                                        alt={`${selectedProvider === "KBZ_PAY" ? "KBZ Pay" : "Wave Pay"} demo QR code, not for payment`}
                                        className="h-auto w-full"
                                      />
                                      <span className="absolute top-3 right-3 rounded-full bg-red-600 px-2 py-1 text-[9px] font-bold tracking-wider text-white uppercase">
                                        Demo
                                      </span>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 font-semibold">
                                        <QrCode className="h-4 w-4 text-primary" />
                                        Scan to pay with{" "}
                                        {selectedProvider === "KBZ_PAY"
                                          ? "KBZ Pay"
                                          : "Wave Pay"}
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        Scan the QR, then enter the transaction
                                        reference and upload your payment
                                        screenshot below.
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </form.Subscribe>

                              <form.Field name="transactionReference">
                                {(field) => (
                                  <Field>
                                    <FieldLabel htmlFor={field.name}>
                                      Transaction reference
                                    </FieldLabel>
                                    <Input
                                      id={field.name}
                                      name={field.name}
                                      value={field.state.value}
                                      onBlur={field.handleBlur}
                                      onChange={(event) =>
                                        field.handleChange(event.target.value)
                                      }
                                      placeholder="Enter your transaction reference"
                                      aria-invalid={
                                        field.state.meta.errors.length > 0
                                      }
                                    />
                                    <FieldError
                                      errors={field.state.meta.errors}
                                    />
                                  </Field>
                                )}
                              </form.Field>

                              <form.Field name="image">
                                {(field) => (
                                  <Field>
                                    <FieldLabel htmlFor={field.name}>
                                      Payment screenshot
                                    </FieldLabel>
                                    <Input
                                      ref={paymentImageInputRef}
                                      id={field.name}
                                      name={field.name}
                                      type="file"
                                      accept="image/*"
                                      onBlur={field.handleBlur}
                                      onChange={(event) =>
                                        field.handleChange(
                                          event.currentTarget.files?.[0] ?? null
                                        )
                                      }
                                      aria-invalid={
                                        field.state.meta.errors.length > 0
                                      }
                                      className="h-auto rounded-xl border-white/40 bg-white/30 py-2 pl-3 backdrop-blur-xl file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary dark:border-white/10 dark:bg-white/5"
                                    />
                                    <FieldError
                                      errors={field.state.meta.errors}
                                    />
                                  </Field>
                                )}
                              </form.Field>
                            </div>

                            <DialogFooter className="gap-2">
                              <DialogClose>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="rounded-full"
                                >
                                  Cancel
                                </Button>
                              </DialogClose>

                              <Button
                                type="submit"
                                disabled={checkoutMutation.isPending}
                                className="gap-2 rounded-full"
                              >
                                <ShieldCheck className="h-4 w-4" />
                                {checkoutMutation.isPending
                                  ? "Submitting..."
                                  : "Confirm order"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Link to="/products" className="block">
                        <Button
                          variant="outline"
                          className="mt-3 w-full gap-2 rounded-full border-white/50 bg-white/20 backdrop-blur-xl hover:bg-white/40 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Continue shopping
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.aside>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default AddToCart
