import { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { motion } from "motion/react"

import { getOrder } from "@/api/orders"
import { Button, buttonVariants } from "@/components/ui/button"

import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleAlert,
  PackageCheck,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react"

// Types
type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"

type OrderTab = "ALL" | "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"

// Format date
const formatDate = (date: string) => {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate)
}

// Format amount
const formatAmount = (amount: number) =>
  `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount)} Ks`

// Status colors
const getStatusColor = (status: OrderStatus | string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500 text-white"

    case "CONFIRMED":
      return "bg-blue-500 text-white"

    case "PROCESSING":
      return "bg-purple-500 text-white"

    case "SHIPPED":
      return "bg-indigo-500 text-white"

    case "DELIVERED":
      return "bg-green-600 text-white"

    case "CANCELLED":
      return "bg-red-500 text-white"

    case "RETURNED":
      return "bg-gray-500 text-white"

    default:
      return "bg-gray-500 text-white"
  }
}

const tabs: { label: string; value: OrderTab }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
]

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState<OrderTab>("ALL")

  // Get orders
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

  // Filter orders
  const filteredOrders =
    activeTab === "ALL"
      ? (orders ?? [])
      : (orders ?? []).filter(
          (order) => order.status === activeTab,
        )

  return (
    <main className="relative mt-20 min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-10">
      
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-[8%] h-80 w-80 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-7 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <ShoppingBag className="size-5" />
              <span className="text-sm font-semibold">
                My Account
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Track and manage your orders.
            </p>
          </div>

          {!isPending && !isError && (
            <div className="rounded-xl border bg-card px-4 py-2 shadow-sm">
              <p className="text-xs text-muted-foreground">
                Total Orders
              </p>
              <p className="text-xl font-bold">
                {orders?.length ?? 0}
              </p>
            </div>
          )}
        </motion.header>

        {/* Loading */}
        {isPending ? (
          <div className="space-y-4" aria-label="Loading orders">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-44 animate-pulse rounded-xl border bg-card/50"
              />
            ))}
          </div>
        ) : isError ? (
          /* Error */
          <section className="rounded-xl border bg-card px-6 py-14 text-center">
            <CircleAlert className="mx-auto mb-4 size-10 text-red-500" />

            <h2 className="text-xl font-bold">
              Couldn't load your orders
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Check your connection and try again.
            </p>

            <Button
              type="button"
              onClick={() => void refetch()}
              disabled={isFetching}
              className="mt-5 gap-2"
            >
              <RefreshCw
                className={`size-4 ${
                  isFetching ? "animate-spin" : ""
                }`}
              />
              Try again
            </Button>
          </section>
        ) : orders.length === 0 ? (
          /* Empty Orders */
          <section className="rounded-xl border bg-card px-6 py-16 text-center">
            <PackageCheck className="mx-auto mb-5 size-14 text-muted-foreground" />

            <h2 className="text-2xl font-bold">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Your orders will appear here after you make a purchase.
            </p>

            <Link
              to="/products"
              className={buttonVariants({
                size: "lg",
                className: "mt-6 gap-2",
              })}
            >
              Explore products
              <ArrowRight className="size-4" />
            </Link>
          </section>
        ) : (
          <>
            {/* Status Tabs */}
            <div className="mb-5 flex flex-wrap items-center gap-1 border-b">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.value

                const count =
                  tab.value === "ALL"
                    ? orders.length
                    : orders.filter(
                        (order) => order.status === tab.value,
                      ).length

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className={`relative px-3 py-3 text-sm font-medium transition-colors sm:px-4 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}

                    <span className="ml-1.5 text-xs opacity-70">
                      {count}
                    </span>

                    {isActive && (
                      <motion.span
                        layoutId="active-order-tab"
                        className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-primary"
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Order List */}
            <motion.div
              layout
              className="space-y-5"
            >
              {filteredOrders.length === 0 ? (
                <div className="rounded-xl border bg-card px-6 py-12 text-center">
                  <PackageCheck className="mx-auto mb-3 size-10 text-muted-foreground" />

                  <h3 className="font-semibold">
                    No {activeTab.toLowerCase()} orders
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    There are no orders in this category.
                  </p>
                </div>
              ) : (
                filteredOrders.map((order, index) => (
                  <motion.article
                    layout
                    key={order.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(index * 0.05, 0.3),
                    }}
                    className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col gap-3 border-b p-4 sm:p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span
                          className={`inline-flex rounded-sm px-3 py-1 text-xs font-semibold ${getStatusColor(
                            order.status,
                          )}`}
                        >
                          {order.status}
                        </span>

                        <div className="flex items-center gap-1 text-sm">
                          <ShoppingCart className="size-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Total:
                          </span>
                          <span className="text-base font-semibold">
                            {formatAmount(order.totalAmount)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" />
                          {formatDate(order.createdAt)}
                        </span>

                        <span className="hidden sm:inline">|</span>

                        <span className="break-all">
                          Order No: {order.id}
                        </span>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="divide-y px-4 sm:px-5">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-wrap items-center gap-4 py-4"
                        >
                          {/* Product Image Placeholder */}
                          <Link
                            to={`/products/${item.productId}`}
                            className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted"
                          >
                            <PackageCheck className="size-7 text-muted-foreground" />
                          </Link>

                          {/* Product Details */}
                          <div className="min-w-0 flex-1">
                            <Link
                              to={`/products/${item.productId}`}
                              className="line-clamp-2 text-sm font-semibold transition-colors hover:text-primary hover:underline"
                            >
                              {item.productName}
                            </Link>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {formatAmount(item.unitPrice)} ×{" "}
                              {item.quantity}
                            </p>
                          </div>

                          {/* Item Subtotal */}
                          <p className="shrink-0 text-sm font-semibold">
                            {formatAmount(item.subtotal)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="flex items-center justify-between border-t bg-muted/20 p-4">
                      <span className="text-xs text-muted-foreground">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </span>

                      <Link
                        to={`/order/${order.id}`}
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                          className: "gap-2",
                        })}
                      >
                        Order Details
                        <ChevronRight className="size-4" />
                      </Link>
                    </div>
                  </motion.article>
                ))
              )}
            </motion.div>
          </>
        )}
      </div>
    </main>
  )
}

export default OrderPage
