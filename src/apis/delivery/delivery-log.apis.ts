import type { AxiosError } from "axios";
import type { GetDeliveryUpdateLogResponseDto } from "../../dtos/deliveryLog/get-delivery-update-log.response.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_DELIVERY_STATUS_LOGS_URL, GET_DELIVERY_UPDATE_LOGS_URL } from "./delivery.urls";
import type { GetDeliveryStatusLogResponseDto } from "../../dtos/deliveryLog/get-delivery-status-log.response.dto";

export const getDeliveryUpdateLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetDeliveryUpdateLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_DELIVERY_UPDATE_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getDeliveryStatusLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetDeliveryStatusLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_DELIVERY_STATUS_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}