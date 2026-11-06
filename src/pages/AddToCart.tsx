import {
  deleteAddToCart,
  deleteAddToCartById,
  getAddToCartItems,
  updateQuantity,
  type createAddToCartProps,
} from "@/api/addToCart"
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  ArrowLeft,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Trash,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { Link } from "react-router-dom"
import { toast } from "sonner"
const AddToCart = () => {
  const queryClient = useQueryClient()
  const [subtotal, setSubtotal] = useState(0)

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
    }
  }
  // clear by id
  const clearCartById = async (id: number) => {
    try {
      const response = await deleteAddToCartById(id)
      if (response.success) {
        toast.success("clear  done")
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error("something went wrong")
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
    mutationFn: (id: number) => clearCartById(id),
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

                      <Dialog>
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

                          <div className="space-y-4 py-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Your name
                                </label>
                                <Input
                                  placeholder="Your name"
                                  className="rounded-xl border-white/40 bg-white/30 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Email
                                </label>
                                <Input
                                  placeholder="you@example.com"
                                  type="email"
                                  className="rounded-xl border-white/40 bg-white/30 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Delivery address
                              </label>
                              <Textarea
                                placeholder="No. 12, Main Street, Yangon"
                                className="min-h-24 resize-none rounded-xl border-white/40 bg-white/30 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Phone number
                              </label>
                              <Input
                                placeholder="09 123 456 789"
                                className="rounded-xl border-white/40 bg-white/30 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                              />
                            </div>
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

                            <Button className="gap-2 rounded-full">
                              <ShieldCheck className="h-4 w-4" />
                              Confirm order
                            </Button>
                          </DialogFooter>
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
