import type { AxiosError } from "axios";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import type { GetAllUserResponseDto } from "../../dtos/user/response/get-all-user.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_ALL_USER_URL } from "./admin.urls";

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