import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { ILoginRequestDTO } from "@/src/shared/dtos/request/auth.dto";
import { ILoginResponseDTO } from "@/src/shared/dtos/response/auth.dto";
import apiClient from "@/src/shared/services/api-client.service";

export const signin = async (data: ILoginRequestDTO) => {
  const response = await apiClient.post<ILoginResponseDTO>(
    ENDPOINTS.auth.login,
    data
  );
  return response.data;
};
