import * as z from "zod"

export const orderCheckoutSchema = z.object({
  shippingName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be 100 characters or fewer."),
  shippingPhone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Phone number must be 20 characters or fewer.")
    .regex(/^[+()\d\s-]+$/, "Enter a valid phone number."),
  shippingAddress: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters.")
    .max(500, "Address must be 500 characters or fewer."),
  note: z.string().max(1000, "Note must be 1000 characters or fewer."),
  providerCode: z.enum(["KBZ_PAY", "WAVE_MONEY"]),
  transactionReference: z
    .string()
    .trim()
    .min(1, "Enter the transaction reference.")
    .max(255, "Transaction reference must be 255 characters or fewer."),
  image: z.custom<File | null>().superRefine((image, context) => {
    if (typeof File === "undefined" || !(image instanceof File)) {
      context.addIssue({
        code: "custom",
        message: "Upload your payment screenshot.",
      })
      return
    }

    if (image.size === 0) {
      context.addIssue({
        code: "custom",
        message: "The selected screenshot is empty.",
      })
    } else if (image.size > 5 * 1024 * 1024) {
      context.addIssue({
        code: "custom",
        message: "Screenshot must be 5 MB or smaller.",
      })
    }

    if (!image.type.startsWith("image/")) {
      context.addIssue({
        code: "custom",
        message: "Upload an image file.",
      })
    }
  }),
})
