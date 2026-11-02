// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { useCartStore } from "@/store/cart-store"
// import {
//   ArrowLeft,
//   Minus,
//   Plus,
//   ShieldCheck,
//   ShoppingBag,
//   ShoppingCart,
//   Trash,
// } from "lucide-react"
// import { motion } from "motion/react"
// import { Link } from "react-router-dom"

// const AddToCart = () => {
//   const cart = useCartStore((state) => state.cart)
//   const removeFromCart = useCartStore((state) => state.removeFromCart)
//   const updateQuantity = useCartStore((state) => state.updateQuantity)
//   const clearCart = useCartStore((state) => state.clearCart)
//   const total = useCartStore((state) => state.getTotalPrice())

//   if (cart.length === 0) {
//     return (
//       <section className="mt-30 px-4 pb-16 md:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.2 }}
//           viewport={{ once: true, amount: 0.2 }}
//           className="mx-auto max-w-4xl"
//         >
//           <Card className="border-border py-10 text-center shadow-none">
//             <CardContent className="flex flex-col items-center gap-6 px-6">
//               <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
//                 <ShoppingBag className="h-10 w-10" />
//               </div>
//               <div className="space-y-3">
//                 <h1 className="text-3xl font-bold tracking-tight">
//                   Your cart is empty
//                 </h1>
//               </div>
//               <Link to="/products">
//                 <Button size="lg" className="gap-2">
//                   <ArrowLeft className="h-4 w-4" />
//                   Continue shopping
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </section>
//     )
//   }

//   return (
//     <section className="mt-24 px-4 pb-16 md:px-8">
//       <div className="mx-auto max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.2 }}
//           viewport={{ once: true, amount: 0.2 }}
//           className="mb-8 flex items-end justify-between gap-4"
//         >
//           <h1 className="mt-2 text-xl font-bold tracking-tight sm:text-4xl">
//             Your cart
//           </h1>

//           <Button type="button" onClick={clearCart} variant={"destructive"}>
//             <ShoppingCart />
//             Clear cart
//           </Button>
//         </motion.div>

//         <div className="grid gap-8 lg:grid-cols-[2.0fr_1.0fr]">
//           <motion.div
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.9, delay: 0.2 }}
//             viewport={{ once: true, amount: 0.2 }}
//             className="space-y-5"
//           >
//             {cart.map((item) => (
//               <Card
//                 key={item.id}
//                 className="relative overflow-hidden border-border/80 bg-card shadow-sm"
//               >
//                 <Button
//                   type="button"
//                   onClick={() => removeFromCart(item.id)}
//                   className={
//                     "absolute top-0 right-0 m-2 h-6 w-6 bg-destructive p-4 hover:bg-red-400"
//                   }
//                 >
//                   <Trash width={5} height={5} />
//                 </Button>
//                 <CardContent className="flex flex-col gap-5 p-4 sm:p-5 md:flex-row">
//                   <Link
//                     to={`/products/${item.id}`}
//                     className="block shrink-0 overflow-hidden rounded-xl bg-muted md:w-40"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="h-32 w-full object-cover transition-transform duration-300 hover:scale-105 md:h-32 md:w-40"
//                     />
//                   </Link>

//                   <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                     <div className="min-w-0 flex-1">
//                       <div className="mb-2 flex items-center gap-2">
//                         <span className="rounded-full bg-primary/5 px-2 py-1 text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
//                           {item.category}
//                         </span>
//                       </div>

//                       <Link to={`/products/${item.id}`} className="block">
//                         <h2 className="line-clamp-2 text-xl font-semibold tracking-tight text-foreground hover:text-primary">
//                           {item.name}
//                         </h2>
//                       </Link>

//                       <p className="mt-2 text-sm text-muted-foreground">
//                         {item.brand}
//                       </p>

//                       <div className="mt-4 flex items-center gap-3">
//                         <span className="text-lg font-bold text-foreground">
//                           {item.price * item.quantity}
//                         </span>
//                         {item.originalPrice > item.price && (
//                           <span className="text-sm text-muted-foreground line-through">
//                             {item.originalPrice * item.quantity}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
//                       <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 p-1">
//                         <button
//                           type="button"
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity - 1)
//                           }
//                           aria-label={`Decrease quantity for ${item.name}`}
//                           className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background"
//                         >
//                           <Minus className="h-4 w-4" />
//                         </button>
//                         <span className="min-w-8 text-center text-sm font-semibold">
//                           {item.quantity}
//                         </span>
//                         <button
//                           type="button"
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity + 1)
//                           }
//                           aria-label={`Increase quantity for ${item.name}`}
//                           className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background"
//                         >
//                           <Plus className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </motion.div>

//           <motion.aside
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.9, delay: 0.2 }}
//             viewport={{ once: true, amount: 0.2 }}
//             className=""
//           >
//             <Card className="sticky top-24 border-border/80 bg-card shadow-sm">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-2xl">Order summary</CardTitle>
//                 <CardDescription>
//                   Everything in your shopping bag.
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="space-y-5 px-5 pb-5">
//                 <div className="space-y-3 text-sm">
//                   <div className="flex items-center justify-between text-muted-foreground">
//                     <span>Subtotal</span>
//                     <span className="font-medium text-foreground">
//                       {total} Ks
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between text-muted-foreground">
//                     <span>Delivery</span>
//                     <span className="font-medium text-foreground">Free</span>
//                   </div>
//                   <div className="flex items-center justify-between text-muted-foreground">
//                     <span>Tax</span>
//                     <span className="font-medium text-foreground">
//                       Included
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-2 pt-2">
//                   <div className="flex items-center justify-between text-base font-semibold text-foreground">
//                     <span>Total</span>
//                     <span>{total} Ks</span>
//                   </div>

//                   <Dialog>
//                     <DialogTrigger
//                       render={
//                         <Button className="w-full" size="lg">
//                           Proceed to checkout
//                         </Button>
//                       }
//                     />
//                     <DialogContent className="my-4 max-h-screen max-w-2xl scrollbar-none overflow-y-auto rounded-2xl sm:max-w-2xl">
//                       <div className="border-b border-border bg-muted/30 px-5 py-2">
//                         <DialogHeader className="items-start gap-2">
//                           <DialogTitle className="text-2xl font-bold">
//                             Checkout
//                           </DialogTitle>
//                           <DialogDescription className="text-sm text-muted-foreground">
//                             Complete your details and pay
//                           </DialogDescription>
//                         </DialogHeader>
//                       </div>

//                       <div className="space-y-4 px-4 py-4">
//                         <div className="grid gap-4 sm:grid-cols-2">
//                           <div className="space-y-2">
//                             <label className="text-sm font-medium text-foreground">
//                               Your name
//                             </label>
//                             <Input placeholder="your name" className="h-11" />
//                           </div>
//                           <div className="space-y-2">
//                             <label className="text-sm font-medium text-foreground">
//                               Email
//                             </label>
//                             <Input
//                               placeholder="you@example.com"
//                               type="email"
//                               className="h-11"
//                             />
//                           </div>
//                         </div>

//                         <div className="grid gap-4 sm:grid-cols-2">
//                           <div className="space-y-2 sm:col-span-2">
//                             <label className="text-sm font-medium text-foreground">
//                               Delivery address
//                             </label>
//                             <Textarea
//                               placeholder="No. 12, Main Street, Yangon"
//                               className="min-h-24 resize-none"
//                             />
//                           </div>
//                           <div className="space-y-2 sm:col-span-2">
//                             <label className="text-sm font-medium text-foreground">
//                               Phone number
//                             </label>
//                             <Input
//                               placeholder="09 123 456 789"
//                               className="h-11"
//                             />
//                           </div>
//                         </div>

//                         {/* <div className="space-y-3">
//                           <label className="text-sm font-medium text-foreground">
//                             Payment method
//                           </label>
//                           <div className="grid gap-3 sm:grid-cols-3">
//                             {(
//                               Object.entries(paymentMethods) as [
//                                 PaymentMethod,
//                                 (typeof paymentMethods)[PaymentMethod],
//                               ][]
//                             ).map(([key, value]) => (
//                               <button
//                                 key={key}
//                                 type="button"
//                                 onClick={() => setSelectedPayment(key)}
//                                 className={`rounded-2xl border p-3 text-left transition-all ${
//                                   selectedPayment === key
//                                     ? "border-primary bg-primary/5 shadow-sm"
//                                     : "border-border bg-background hover:border-primary/40"
//                                 }`}
//                               >
//                                 <div className="mb-2 flex items-center justify-between">
//                                   <span className="text-base font-semibold text-foreground">
//                                     {value.name}
//                                   </span>
//                                   {selectedPayment === key && (
//                                     <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//                                       <Check className="h-3 w-3" />
//                                     </span>
//                                   )}
//                                 </div>
//                                 <p className="text-xs text-muted-foreground">
//                                   {value.description}
//                                 </p>
//                               </button>
//                             ))}
//                           </div>
//                           <div className="grid gap-3 sm:grid-cols-3">
//                             <button
//                               type="button"

//                               className={`rounded-2xl border p-3 text-left transition-all ${
//                                 selectedPayment === "ayapay"
//                                   ? "border-primary bg-primary/5 shadow-sm"
//                                   : "border-border bg-background hover:border-primary/40"
//                               }`}
//                             >
//                               <div className="mb-2 flex items-center justify-between">
//                                 <span className="text-base font-semibold text-foreground">
//                                   {paymentMethods.ayapay.name}
//                                 </span>

//                                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//                                   <Check className="h-3 w-3" />
//                                 </span>
//                               </div>
//                               <p className="text-xs text-muted-foreground">
//                                 {paymentMethods.ayapay.description}
//                               </p>
//                             </button>
//                             <button
//                               type="button"

//                               className={`rounded-2xl border p-3 text-left transition-all ${
//                                 selectedPayment === "kpay"
//                                   ? "border-primary bg-primary/5 shadow-sm"
//                                   : "border-border bg-background hover:border-primary/40"
//                               }`}
//                             >
//                               <div className="mb-2 flex items-center justify-between">
//                                 <span className="text-base font-semibold text-foreground">
//                                   {paymentMethods.kpay.name}
//                                 </span>

//                                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//                                   <Check className="h-3 w-3" />
//                                 </span>
//                               </div>
//                               <p className="text-xs text-muted-foreground">
//                                 {paymentMethods.kpay.description}
//                               </p>
//                             </button>
//                             <button
//                               type="button"

//                               className={`rounded-2xl border p-3 text-left transition-all ${
//                                 selectedPayment === "wavepay"
//                                   ? "border-primary bg-primary/5 shadow-sm"
//                                   : "border-border bg-background hover:border-primary/40"
//                               }`}
//                             >
//                               <div className="mb-2 flex items-center justify-between">
//                                 <span className="text-base font-semibold text-foreground">
//                                   {paymentMethods.wavepay.name}
//                                 </span>

//                                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//                                   <Check className="h-3 w-3" />
//                                 </span>
//                               </div>
//                               <p className="text-xs text-muted-foreground">
//                                 {paymentMethods.wavepay.description}
//                               </p>
//                             </button>
//                           </div>
//                         </div>

//                         <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4">
//                           <div className="flex items-center justify-between gap-3">
//                             <div>
//                               <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
//                                 Pay to
//                               </p>
//                               <p className="mt-2 text-xl font-bold text-foreground">
//                                 {paymentMethods[selectedPayment].name}
//                               </p>
//                               <p className="text-md mt-2 font-semibold text-foreground">
//                                 Account Name ({" "}
//                                 {paymentMethods[selectedPayment].username})
//                               </p>
//                             </div>
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               onClick={handleCopy}
//                               className="gap-2"
//                             >
//                               <Copy className="h-4 w-4" />
//                               {copied ? "Copied" : "Copy"}
//                             </Button>
//                           </div>

//                           <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2">
//                             <span className="font-mono text-sm font-semibold text-foreground">
//                               {paymentMethods[selectedPayment].number}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <label className="text-sm font-medium text-foreground">
//                             Upload payment screenshot
//                           </label>
//                           <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center transition-colors hover:border-primary/50 hover:bg-primary/5">
//                             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary shadow-sm">
//                               <Upload className="h-5 w-5" />
//                             </div>
//                             <div>
//                               <p className="font-medium text-foreground">
//                                 Click to upload payment proof
//                               </p>
//                               <p className="text-xs text-muted-foreground">
//                                 JPG, PNG, or PDF screenshot
//                               </p>
//                             </div>
//                             <input
//                               type="file"
//                               accept="image/*,.pdf"

//                               className="hidden"
//                             />
//                           </label>
//                         </div> */}
//                       </div>

//                       <DialogFooter className="border-t border-border bg-muted/30 px-5 py-4">
//                         <DialogClose>
//                           <Button variant="outline">Cancel</Button>
//                         </DialogClose>
//                         <Button className="gap-2">
//                           <ShieldCheck className="h-4 w-4" />
//                           Confirm order
//                         </Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>
//                   <Link to="/products">
//                     <Button variant="outline" className="mt-2 w-full gap-2">
//                       <ArrowLeft className="h-4 w-4" />
//                       Continue shopping
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.aside>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default AddToCart

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
import { useCartStore } from "@/store/cart-store"
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
import { Link } from "react-router-dom"

const AddToCart = () => {
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const total = useCartStore((state) => state.getTotalPrice())

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
        {cart.length === 0 ? (
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
                  {cart.length} {cart.length === 1 ? "item" : "items"} in your
                  cart
                </p>
              </div>

              <Button
                type="button"
                onClick={clearCart}
                variant="destructive"
                className="gap-2 rounded-full"
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
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
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
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <Button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
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
                            to={`/products/${item.id}`}
                            className="block shrink-0 overflow-hidden rounded-2xl border border-white/30 bg-white/20 md:w-40 dark:border-white/10"
                          >
                            <motion.img
                              whileHover={{ scale: 1.08 }}
                              transition={{ duration: 0.4 }}
                              src={item.image}
                              alt={item.name}
                              className="h-40 w-full object-cover md:h-36 md:w-40"
                            />
                          </Link>

                          {/* Product details */}
                          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="min-w-0 flex-1">
                              <span className="mb-2 inline-flex rounded-full border border-primary/10 bg-primary/10 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-primary uppercase">
                                {item.category}
                              </span>

                              <Link
                                to={`/products/${item.id}`}
                                className="block"
                              >
                                <h2 className="line-clamp-2 text-lg font-semibold tracking-tight transition-colors hover:text-primary sm:text-xl">
                                  {item.name}
                                </h2>
                              </Link>

                              <p className="mt-1 text-sm text-muted-foreground">
                                {item.brand}
                              </p>

                              <div className="mt-4 flex items-center gap-3">
                                <motion.span
                                  key={item.price * item.quantity}
                                  initial={{ scale: 1.15, opacity: 0.5 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="text-lg font-bold text-foreground"
                                >
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}{" "}
                                  Ks
                                </motion.span>

                                {item.originalPrice > item.price && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    {(
                                      item.originalPrice * item.quantity
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
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  aria-label={`Decrease quantity for ${item.name}`}
                                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/60 dark:hover:bg-white/10"
                                >
                                  <Minus className="h-4 w-4" />
                                </motion.button>

                                <AnimatePresence mode="popLayout">
                                  <motion.span
                                    key={item.quantity}
                                    initial={{ opacity: 0, y: -8, scale: 0.8 }}
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
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
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
                          key={total}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-medium text-foreground"
                        >
                          {total.toLocaleString()} Ks
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
                          key={`total-${total}`}
                          initial={{ scale: 1.08, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          {total.toLocaleString()} Ks
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
