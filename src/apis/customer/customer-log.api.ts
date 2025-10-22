import type { AxiosError } from "axios";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_CUSTOMER_STATUS_LOGS_URL, GET_CUSTOMER_UPDATE_LOGS_URL } from "./customer.urls";
import type ResponseDto from "../../dtos/response.dto";
import type PageDto from "../../dtos/page.dto";
import type { GetCustomerUpdateLogResponseDto } from "../../dtos/customerLog/get-customer-update-log.response.dto";
import type { GetCustomerStatusLogResponseDto } from "../../dtos/customerLog/get-customer-status-log.response.dto";

export const getCustomerUpdateLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetCustomerUpdateLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_CUSTOMER_UPDATE_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getCustomerStatusLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetCustomerStatusLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_CUSTOMER_STATUS_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}