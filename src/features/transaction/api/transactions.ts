import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import {
  CreateTransactionDTO,
  SplitTransactionDTO,
  UpdateTransactionDTO,
} from "@/src/shared/dtos/request/transaction.dto";
import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";
import apiClient from "@/src/shared/services/api-client.service";

// ✅ Get transaction by ID
export const fetchTransactions = async (accountId: number = 1) => {
  const { data } = await apiClient.get<ITransaction[]>(
    ENDPOINTS.transactions.all(accountId)
  );
  return data;
};
export const getTransactionById = async (id: number) => {
  const response = await apiClient.get<ITransaction>(
    ENDPOINTS.transactions.getById(id)
  );
  return response.data;
};

// ✅ Create new transaction
export const createTransaction = async (data: CreateTransactionDTO) => {
  const response = await apiClient.post(ENDPOINTS.transactions.create, data);
  return response.data;
};
export const splitTransaction = async (data: SplitTransactionDTO) => {
  const response = await apiClient.post(
    ENDPOINTS.transactions.splitTransaction,
    data
  );
  return response.data;
};

// ✅ Update transaction
export const updateTransaction = async (data: Partial<ITransaction>) => {
  const response = await apiClient.patch(
    ENDPOINTS.transactions.update(data.transactionId as number),
    data
  );
  return response.data;
};

// ✅ Delete transaction
export const deleteTransaction = async (id: number) => {
  const response = await apiClient.delete(`/transactions/${id}`);
  return response.data;
};
