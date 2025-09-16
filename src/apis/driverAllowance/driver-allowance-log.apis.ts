import type { AxiosError } from "axios";
import type { GetDriverAllowanceUpdateLogResponseDto } from "../../dtos/driverAllowanceLog/response/get-driver-allowance-update-log.response.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_DRIVER_ALLOWANCE_UPDATE_LOGS_URL } from "./driver-allowance.urls";

export const getDriverAllowanceUpdateLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetDriverAllowanceUpdateLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_DRIVER_ALLOWANCE_UPDATE_LOGS_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};