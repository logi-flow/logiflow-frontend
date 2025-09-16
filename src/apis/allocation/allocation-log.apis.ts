import type { AxiosError } from "axios";
import type { GetAllocationUpdateLogResponseDto } from "../../dtos/allocationLog/get-allocation-update-log.response.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_ALLOCATION_STATUS_LOGS_URL, GET_ALLOCATION_UPDATE_LOGS_URL } from "./allocation.urls";
import type { GetAllocationStatusLogResponseDto } from "../../dtos/allocationLog/get-allocation-status-log.response.dto";

export const getAllocationUpdateLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllocationUpdateLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALLOCATION_UPDATE_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllocationStatusLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllocationStatusLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALLOCATION_STATUS_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}