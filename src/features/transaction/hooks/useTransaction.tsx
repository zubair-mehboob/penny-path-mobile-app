import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";
import { storageService } from "@/src/shared/services/storage.service";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../api/transactions";

export const useGetTransactions = () => {
  const accountId = storageService.get("accountId");
  console.log("account id from storage service", { accountId });
  return useQuery<ITransaction[]>({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(accountId as number),
  });
};
