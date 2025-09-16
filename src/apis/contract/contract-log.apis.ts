import type { AxiosError } from "axios";
import type { GetContractUpdateLogResponseDto } from "../../dtos/contractLog/get-contract-update-log.response.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_CONTRACT_STATUS_LOGS_URL, GET_CONTRACT_UPDATE_LOGS_URL } from "./contract.urls";
import type { GetContractStatusLogResponseDto } from "../../dtos/contractLog/get-contract-status-log.response.dto";

export const getContractUpdateLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetContractUpdateLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_CONTRACT_UPDATE_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getContractStatusLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetContractStatusLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_CONTRACT_STATUS_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}