import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

/**
 * ✅ Generic GET Hook
 * Accepts a `queryKey` and a fetcher function.
 */
export const useGet = <TData>(
  key: string[],
  fetcher: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">
) => {
  return useQuery<TData>({
    queryKey: key,
    queryFn: fetcher,
    ...options,
  });
};

/**
 * ✅ Generic POST Hook
 * Accepts a function instead of a URL.
 */
export const usePost = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">
) => {
  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    ...options,
  });
};

/**
 * ✅ Generic PUT Hook
 */
export const usePut = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">
) => {
  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    ...options,
  });
};

/**
 * ✅ Generic PATCH Hook
 */
export const usePatch = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">
) => {
  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    ...options,
  });
};

/**
 * ✅ Generic DELETE Hook
 * Optionally supports variables (like an ID or payload)
 */
export const useDelete = <TData, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">
) => {
  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    ...options,
  });
};
