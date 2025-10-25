import { z } from "zod";

export const CreateTransactionSchema = z.object({
  description: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .refine((val) => Number.isFinite(val) && val >= 0, {
      message: "Amount must be a valid number",
    }),
  date: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date({ required_error: "Date is required" })
  ),
  accountId: z
    .number({
      required_error: "Account ID is required",
    })
    .optional(),
});
export const SplitTransactionSchema = z.object({
  description: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .refine((val) => Number.isFinite(val) && val >= 0, {
      message: "Amount must be a valid number",
    }),
  date: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date({ required_error: "Date is required" })
  ),
  accountId: z.number({}).optional(),
  parentId: z.number({}).optional(),
  transactionId: z.number().optional(),
});

export const UpdateTransactionSchema = CreateTransactionSchema.extend({
  parentId: z
    .number()
    .int()
    .min(1, "Parent ID must be greater than 0")
    .optional(),
  parent: z.any().optional(), // since 'Transaction' is a server entity, keep generic here
});

// ✅ Types for strong typing
export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>;
export type SplitTransactionDTO = z.infer<typeof SplitTransactionSchema>;
export type UpdateTransactionDTO = z.infer<typeof UpdateTransactionSchema>;
