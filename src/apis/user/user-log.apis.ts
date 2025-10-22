import type { AxiosError } from "axios";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import type { GetUserStatusLogResponseDto } from "../../dtos/userLog/get-user-status-log.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_USER_ROLE_LOGS_URL, GET_USER_STATUS_LOGS_URL } from "./user.urls";
import type { GetUserRoleLogResponseDto } from "../../dtos/userLog/get-user-role-log.response.dto";

export const getUserStatusLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetUserStatusLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_USER_STATUS_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getUserRoleLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetUserRoleLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_USER_ROLE_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}