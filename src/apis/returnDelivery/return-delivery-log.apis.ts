import type { AxiosError } from "axios";
import type ResponseDto from "../../dtos/response.dto";
import type { GetAllReturnDeliveryUpdateLogResponseDto } from "../../dtos/returnDeliveryLog/response/get-all-return-delivery-update-log.response.dto";
import {
  axiosInstance,
  bearerAuthorization,
  responseErrorHandler,
  responseSuccessHandler,
} from "../axios-config";
import { GET_ALL_RETURN_DELIVERY_STATUS_LOGS_URL, GET_ALL_RETURN_DELIVERY_UPDATE_LOGS_URL } from "./return-delivery-log.urls";
import type { GetAllReturnDeliveryStatusLogResponseDto } from "../../dtos/returnDeliveryLog/response/get-all-return-delivery-status-log.response.dto";

export const getAllReturnDeliveryUpdateLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<GetAllReturnDeliveryUpdateLogResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_RETURN_DELIVERY_UPDATE_LOGS_URL,
      {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken),
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllReturnDeliveryStatusLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<GetAllReturnDeliveryStatusLogResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_RETURN_DELIVERY_STATUS_LOGS_URL,
      {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken),
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
