import type { AxiosError } from "axios";
import type { GetAllAlertResponseDto } from "../../dtos/alert/response/get-all-alert.response.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_MY_ALERT_URL } from "./alert.urls";

export const getMyAlerts = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllAlertResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_MY_ALERT_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};