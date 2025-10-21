import { IAccount } from "@/src/shared/dtos/response/account.dto";
import { storageService } from "@/src/shared/services/storage.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAccounts,
  getDefaultAccount,
  setDefaultAccount,
} from "../api/account";

export const useGetAccounts = () => {
  return useQuery<IAccount[]>({
    queryKey: ["accounts"],
    queryFn: () => fetchAccounts(),
  });
};

export const useGetDefaultAccount = () => {
  return useQuery<IAccount, Error>({
    queryKey: ["default-account"],
    queryFn: getDefaultAccount,
  });
};

export const useSetDefaultAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (accountId: number) => {
      return setDefaultAccount(accountId);
    },
    onSuccess: async (data: IAccount, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      await storageService.set("accountId", data.accountId);
    },
  });
};
