// src/api/useApi.ts
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import apiClient from "../services/api-client.service";

// ✅ Type-safe GET
export const useGet = <TData>(
  key: string[],
  url: string,
  options?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">
) => {
  return useQuery<TData>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await apiClient.get<TData>(url);
      return data;
    },
    ...options,
  });
};

// ✅ Type-safe POST
export const usePost = <TData, TVariables>(
  url: string,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">
) => {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (body: TVariables) => {
      const { data } = await apiClient.post<TData>(url, body);
      console.log("reached here in usePost", data);
      return data;
    },
    ...options,
  });
};
