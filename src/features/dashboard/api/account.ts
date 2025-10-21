import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import {
  CreateTransactionDTO,
  SplitTransactionDTO,
  UpdateTransactionDTO,
} from "@/src/shared/dtos/request/transaction.dto";
import {
  CreateAccountDTO,
  IAccount,
} from "@/src/shared/dtos/response/account.dto";
import apiClient from "@/src/shared/services/api-client.service";

// ✅ Get transaction by ID
export const fetchAccounts = async () => {
  const { data } = await apiClient.get<IAccount[]>(ENDPOINTS.accounts.all);
  return data;
};
export const getAccountById = async (id: number) => {
  const response = await apiClient.get<IAccount>(
    ENDPOINTS.accounts.getById(id)
  );
  return response.data;
};
export const getDefaultAccount = async () => {
  const response = await apiClient.get<IAccount>(ENDPOINTS.accounts.getDefault);
  return response.data;
};

// ✅ Create new transaction
export const createAccount = async (data: CreateAccountDTO) => {
  const response = await apiClient.post<CreateAccountDTO>(
    ENDPOINTS.accounts.create,
    data
  );
  return response.data;
};
export const setDefaultAccount = async (accountId: number) => {
  const response = await apiClient.patch(
    ENDPOINTS.accounts.setDefault(accountId)
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
