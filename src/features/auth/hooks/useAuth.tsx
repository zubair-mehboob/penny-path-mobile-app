import { useMutation } from "@tanstack/react-query";
import { signin } from "../api/auth";
import { ILoginResponseDTO } from "@/src/shared/dtos/response/auth.dto";
import { ILoginRequestDTO } from "@/src/shared/dtos/request/auth.dto";
import { IUser } from "../context/AuthContex";

export const useSignin = (
  onSuccess: (token: string, accountId: number, data: IUser) => void
) => {
  return useMutation({
    mutationFn: signin,
    onSuccess: (data: ILoginResponseDTO, variables: ILoginRequestDTO) => {
      onSuccess(data.jwt, data.accountId, {
        email: data.email,
        name: data.name,
        userId: data.userId,
      });
    },
  });
};
