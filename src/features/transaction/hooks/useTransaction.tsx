import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../api/transactions";

export const useGetTransactions = (accountId: number) => {
  return useQuery<ITransaction[]>({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(accountId as number),
  });
};
