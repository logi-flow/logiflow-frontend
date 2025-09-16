import type { AxiosError } from "axios";
import type { GetAllowanceTypeUpdateLogResponseDto } from "../../dtos/allowanceTypeLog/response/get-allowance-type-update-log.response.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_ALLOWANCE_TYPE_UPDATE_LOGS_URL } from "./allowance-type.urls";

export const getAllowanceTypeUpdateLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllowanceTypeUpdateLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALLOWANCE_TYPE_UPDATE_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};