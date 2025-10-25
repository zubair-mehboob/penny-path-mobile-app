import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  createTransaction,
  fetchTransactions,
  getTransactionById,
  splitTransaction,
  updateTransaction,
} from "../api/transactions";
export const useGetTransactions = (accountId: number) => {
  return useQuery<ITransaction[]>({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(accountId as number),
  });
};

export const useGetTransactionById = (id: string | string[]) => {
  return useQuery({
    queryKey: [`transaction_${id}`],
    queryFn: () => getTransactionById(Number(id)),
  });
};
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: (data: any, variables) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.back();
    },
    onError: (err) => {
      console.log({ err });
    },
  });
};

export const useCreateSplitTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: splitTransaction,
    onSuccess: (data: any, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`transaction_${variables.parentId}`],
        refetchType: "active",
      });
    },
    onError: (err) => {
      console.log({ err });
    },
  });
};

export const useUpdateTransaction = (parentId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: (data: any, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`transaction_${parentId}`],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: [`transactions`],
        refetchType: "active",
      });
      if (variables.transactionId === parentId) {
        router.back();
      }
    },
    onError: (err) => {
      console.log({ err });
    },
  });
};
