import Transaction from "@/models/Transaction";
import dbConnect from "@/lib/mongoose";
import { ApiError } from "@/lib/errors/api.error";
import {
  AddTransactionType,
  UpdateTransactionType,
} from "@/lib/validators/transaction.validator";

export const addTransaction = async (data: AddTransactionType) => {
  try {
    await dbConnect();
    await Transaction.create(data);

    return {
      success: true,
      message: "Transaction added successfully",
    };
  } catch {
    throw new ApiError("Failed to add transaction");
  }
};

export const updateTransaction = async (
  transactionId: string,
  data: UpdateTransactionType
) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new ApiError("Transaction not found", 404);
    }

    await transaction.update(data);

    return {
      success: true,
      message: "Transaction updated successfully",
    };
  } catch {
    throw new ApiError("Failed to update transaction");
  }
};

export const deleteTransaction = async (transactionId: string) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new ApiError("Transaction not found", 404);
    }
    await transaction.delete();

    return {
      success: true,
      message: "Transaction deleted successfully",
    };
  } catch {
    throw new ApiError("Failed to delete transaction");
  }
};

export const getTransaction = async (transactionId: string) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new ApiError("Transaction not found", 404);
    }
    return {
      success: true,
      message: "Transaction fetched successfully",
      transaction,
    };
  } catch {
    throw new ApiError("Failed to fetch transaction");
  }
};

export const getTransactions = async () => {
  try {
    const transactions = await Transaction.find();

    return {
      success: true,
      message: "Transaction fetched successfully",
      transactions,
    };
  } catch {
    throw new ApiError("Failed to fetch transactions");
  }
};
