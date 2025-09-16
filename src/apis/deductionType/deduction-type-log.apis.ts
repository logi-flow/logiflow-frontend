import type { AxiosError } from "axios";
import type { GetDeductionTypeUpdateLogResponseDto } from "../../dtos/deductionTypeLog/response/get-deduction-type-update-log.response.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_DEDUCTION_TYPE_UPDATE_LOGS_URL } from "./deduction-type.urls";

export const getDeductionTypeUpdateLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetDeductionTypeUpdateLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_DEDUCTION_TYPE_UPDATE_LOGS_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};