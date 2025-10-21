import type { AxiosError } from "axios";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import type { GetAllUserResponseDto } from "../../dtos/user/response/get-all-user.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { USER_ID_URL, USER_MODULE_URL, USER_ROLE_URL, USER_STATUS_URL } from "./user.urls";
import type { GetUserDetailResponseDto } from "../../dtos/user/response/get-user-detail.response.dto";
import type { UpdateUserStatusRequestDto } from "../../dtos/user/request/update-user-status.request.dto";
import type { UpdateUserStatusResponseDto } from "../../dtos/user/response/update-user-status.response.dto";
import type { UpdateUserRoleRequestDto } from "../../dtos/user/request/update-user-role.request.dto";
import type { UpdateUserRoleResponseDto } from "../../dtos/user/response/update-user-role.response.dto";

export const getAllUser = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllUserResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      USER_MODULE_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getUserDetail = async (
  userId: number,
  accessToken: string
): Promise<ResponseDto<GetUserDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      `${USER_ID_URL}/${userId}`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateUserStatus = async (
  userId: number,
  dto: UpdateUserStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateUserStatusResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      `${USER_STATUS_URL}/${userId}`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateUserRole = async (
  userId: number,
  dto: UpdateUserRoleRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateUserRoleResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      `${USER_ROLE_URL}/${userId}`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteUser = async (
  userId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      `${USER_ID_URL}/${userId}`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};