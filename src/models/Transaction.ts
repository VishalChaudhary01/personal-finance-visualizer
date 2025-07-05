import mongoose, { Document } from "mongoose";
import {
  TRANSACTION_TYPES,
  TransactionType,
} from "@/lib/types/transaction.type";

export interface TransactionDocument extends Document {
  amount: number;
  type: TransactionType;
  date: Date;
  description?: string;
}

const transactionSchema = new mongoose.Schema<TransactionDocument>({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: TRANSACTION_TYPES,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
});

export default mongoose.models.Transaction ||
  mongoose.model<TransactionDocument>("Transaction", transactionSchema);
