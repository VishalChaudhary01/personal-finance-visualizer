import { z } from "zod";
import { TRANSACTION_TYPES } from "../types/transaction.type";

export const addTransactionSchema = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),

  type: z.enum(TRANSACTION_TYPES, {
    required_error: "Transaction type is required",
  }),

  date: z
    .union([
      z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Date must be a valid ISO date string",
      }),
      z.date(),
    ])
    .transform((val) => (typeof val === "string" ? new Date(val) : val)),

  description: z
    .string()
    .trim()
    .max(200, "Description can't exceed 200 characters")
    .optional(),
});

export const updateTransactionSchema = addTransactionSchema.partial();

export type AddTransactionType = z.infer<typeof addTransactionSchema>;
export type UpdateTransactionType = z.infer<typeof updateTransactionSchema>;
