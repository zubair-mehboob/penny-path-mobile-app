import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import {
  CreateTransactionDTO,
  SplitTransactionDTO,
  UpdateTransactionDTO,
} from "@/src/shared/dtos/request/transaction.dto";
import { IAccount } from "@/src/shared/dtos/response/account.dto";
import apiClient from "@/src/shared/services/api-client.service";

// ✅ Get transaction by ID
export const fetchAccounts = async (userId: number = 1) => {
  const { data } = await apiClient.get<IAccount[]>(
    ENDPOINTS.accounts.all(userId)
  );
  return data;
};
export const getTransactionById = async (id: number) => {
  const response = await apiClient.get<IAccount>(
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
export const updateTransaction = async (
  id: number,
  data: UpdateTransactionDTO
) => {
  const response = await apiClient.put(`/transactions/${id}`, data);
  return response.data;
};

// ✅ Delete transaction
export const deleteTransaction = async (id: number) => {
  const response = await apiClient.delete(`/transactions/${id}`);
  return response.data;
};
