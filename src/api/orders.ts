import { axiosInstance } from "./axiosInstance"

export type CreateOrderPayload = {
  paymentMethod: "MANUAL"
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  note: string
  items: {
    productId: string
    quantity: number
  }[]
}

export type ManualPaymentPayload = {
  providerCode: "KBZ_PAY" | "WAVE_MONEY"
  transactionReference: string
  image: File
}

export type CreateOrderResponse = {
  success?: boolean
  message?: string
  orderId?: string
  data?: {
    id?: string
    orderId?: string
  }
}

type ManualPaymentResponse = {
  success?: boolean
  message?: string
}

export type OrderProps = {
  data: {
    items: {
      id: string
      orderNumber: string
      status: string
      totalAmount: number
      shippingName: string
      shippingAddress: string
      shippingPhone: string
      createdAt: string
      items: {
        id: string
        productId: string
        productName: string
        unitPrice: number
        quantity: number
        subtotal: number
      }[]
    }[]
  }
}

export const createOrder = async (payload: CreateOrderPayload) => {
  const response = await axiosInstance.post<CreateOrderResponse>(
    "/orders",
    payload
  )
  return response.data
}

export const submitManualPayment = async (
  orderId: string,
  payload: ManualPaymentPayload
) => {
  const formData = new FormData()
  formData.append("providerCode", payload.providerCode)
  formData.append("transactionReference", payload.transactionReference)
  formData.append("image", payload.image)

  const response = await axiosInstance.post<ManualPaymentResponse>(
    `/payments/orders/${orderId}/manual`,
    formData
  )
  return response.data
}

export const getOrder = async () => {
  const response = await axiosInstance.get<OrderProps>("/orders")
  return response.data
}
