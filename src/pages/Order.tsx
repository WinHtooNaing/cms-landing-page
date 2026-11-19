import { getOrder } from "@/api/orders"
import { Button, buttonVariants } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleAlert,
  Clock3,
  MapPin,
  PackageCheck,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"

const formatDate = (date: string) => {
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return "Date unavailable"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate)
}

const formatAmount = (amount: number) =>
  `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)} Ks`

const OrderPage = () => {
  const {
    data: orders,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await getOrder()
      return response.data.items
    },
  })

  return (
    <main className="relative mt-20 min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-[8%] h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-primary/30 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute top-40 left-0 h-72 w-72 rounded-full bg-primary/30 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-primary uppercase shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <ShoppingBag className="size-3.5" />
              Your account
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Order history
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Keep track of your purchases and delivery details in one place.
            </p>
          </div>

          {!isPending && !isError && (
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/60 bg-white/40 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <p className="text-xs text-muted-foreground">Total orders</p>
                <p className="mt-0.5 text-xl font-bold">
                  {orders?.length ?? 0}
                </p>
              </div>
            </div>
          )}
        </motion.header>

        {isPending ? (
          <div className="space-y-4" aria-label="Loading orders">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-3xl border border-white/60 bg-white/30 shadow-lg shadow-slate-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
              />
            ))}
          </div>
        ) : isError ? (
          <section className="rounded-3xl border border-white/60 bg-white/40 px-6 py-14 text-center shadow-xl shadow-slate-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-300">
              <CircleAlert className="size-7" />
            </div>
            <h2 className="text-xl font-bold">We couldn't load your orders</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Check your connection and try again.
            </p>
            <Button
              type="button"
              onClick={() => void refetch()}
              disabled={isFetching}
              className="mt-6 gap-2 rounded-full"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Try again
            </Button>
          </section>
        ) : orders.length === 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/60 bg-white/40 px-6 py-16 text-center shadow-xl shadow-slate-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl border border-white/60 bg-white/60 text-primary shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
              <PackageCheck className="size-9" />
            </div>
            <h2 className="text-2xl font-bold">No orders yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Once you place an order, its status and delivery information will
              show up here.
            </p>
            <Link
              to="/products"
              className={buttonVariants({
                size: "lg",
                className: "mt-7 gap-2 rounded-full",
              })}
            >
              Explore products
              <ArrowRight className="size-4" />
            </Link>
          </motion.section>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {orders.map((order, index) => (
              <motion.article
                key={order.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.06, 0.3),
                }}
                className="group rounded-3xl border border-white/60 bg-white/40 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/55 hover:shadow-xl sm:p-6 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold text-white ${order.status === "PENDING" && "bg-yellow-500"} ${order.status === "CONFIRMED" && "bg-green-500"} `}
                      >
                        <span className="size-1.5 rounded-full bg-current" />
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-4" />
                        {formatDate(order.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" />
                        <span className="max-w-56 truncate">
                          {order.shippingAddress}
                        </span>
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Recipient:{" "}
                      <span className="font-medium text-foreground">
                        {order.shippingName}
                      </span>
                      <span className="mx-2 text-border">·</span>
                      {order.shippingPhone}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/50 pt-4 sm:min-w-44 sm:justify-end sm:gap-4 sm:border-0 sm:pt-0 dark:border-white/10">
                    <div className="sm:text-right">
                      <p className="inline-flex items-center gap-1 text-xs text-muted-foreground sm:justify-end">
                        <Clock3 className="size-3.5" />
                        Order total
                      </p>
                      <p className="mt-1 text-xl font-bold">
                        {formatAmount(order.totalAmount)}
                      </p>
                    </div>
                    <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 sm:hidden" />
                  </div>
                </div>

                <section className="mt-5 border-t border-white/50 pt-4 dark:border-white/10">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <ShoppingCart className="size-4 text-primary" />
                    Items in this order
                    <span className="font-normal text-muted-foreground">
                      ({order.items.length})
                    </span>
                  </h3>
                  <div className="divide-y divide-white/50 dark:divide-white/10">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <Link
                            to={`/products/${item.productId}`}
                            className="truncate text-sm font-semibold transition-colors hover:text-primary hover:underline"
                          >
                            {item.productName}
                          </Link>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatAmount(item.unitPrice)}
                            <span className="mx-2 text-border">·</span>
                            Qty {item.quantity}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold sm:text-right">
                          {formatAmount(item.subtotal)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default OrderPage
