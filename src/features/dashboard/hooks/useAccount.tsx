import { IAccount } from "@/src/shared/dtos/response/account.dto";
import { useGet, usePatch } from "@/src/shared/hooks/useApi";
import {
  fetchAccounts,
  getDefaultAccount,
  setDefaultAccount,
} from "../api/account";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { storageService } from "@/src/shared/services/storage.service";

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
      console.log("getting this account id to be set", { accountId });
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
