import { IAccount } from "@/src/shared/dtos/response/account.dto";
import { useGet, usePatch } from "@/src/shared/hooks/useApi";
import { fetchAccounts, setDefaultAccount } from "../api/account";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export const useGetAccounts = (userId: number = 1) => {
  return useQuery<IAccount[]>({
    queryKey: ["accounts"],
    queryFn: () => fetchAccounts(userId),
  });
};

export const useSetDefaultAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (accountId: number) => setDefaultAccount(accountId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
