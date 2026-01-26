import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.enum(TransactionType), // corrected line / antes era z.nativeEnum
  category: z.enum(TransactionCategory), // corrected line / antes era z.nativeEnum
  paymentMethod: z.enum(TransactionPaymentMethod), // corrected line / antes era z.nativeEnum
  date: z.date(),
});
