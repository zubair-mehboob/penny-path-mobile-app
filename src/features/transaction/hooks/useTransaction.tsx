import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  createTransaction,
  fetchTransactions,
  getTransactionById,
  splitTransaction,
} from "../api/transactions";
export const useGetTransactions = (accountId: number) => {
  return useQuery<ITransaction[]>({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(accountId as number),
  });
};

export const useGetTransactionById = (id: string | string[]) => {
  console.log("after split transaction get api called with id", id);
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
      console.log("after success invalidate this id", variables.parentId);
      queryClient.invalidateQueries({
        queryKey: [`transaction_${variables.parentId}`],
        refetchType: "active",
      });

      console.log({ data }, "split transaction success");
    },
    onError: (err) => {
      console.log({ err });
    },
  });
};
