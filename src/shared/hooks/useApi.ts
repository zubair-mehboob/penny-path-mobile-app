// src/api/useApi.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client.service";

export const useGet = (key: string[], url: string, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await apiClient.get(url);
      return data;
    },
    ...options,
  });
};

export const usePost = (url: string, options = {}) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const { data } = await apiClient.post(url, body);
      return data;
    },
    ...options,
  });
};
