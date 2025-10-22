import type { AxiosError } from "axios";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import type { GetAllUserResponseDto } from "../../dtos/user/response/get-all-user.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { ADMIN_PASSWORD_RESET_URL, GET_ALL_USER_URL } from "./admin.urls";
import type { AdminResetPasswordResponseDto } from "../../dtos/admin/response/admin-reset-password.response.dto";
import type { AdminResetPasswordRequestDto } from "../../dtos/admin/request/admin-reset-password.request.dto";

export const getAllUser = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllUserResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_USER_URL, {
      params: { page, size, sort},
      ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
};

export const adminPasswordResetCustomer = async (
  dto: AdminResetPasswordRequestDto,
) : Promise<ResponseDto<AdminResetPasswordResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      ADMIN_PASSWORD_RESET_URL,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
