import type { AxiosError } from "axios";
import type { CreateDriverRequestDto } from "../../dtos/driver/request/create-driver.request.dto";
import type { CreateDriverResponseDto } from "../../dtos/driver/response/create-driver.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_DRIVER_URL, GET_ALL_DRIVER_URL, GET_MY_INFO_URL, RETIRED_DRIVER_URL, UPDATE_DRIVER_BY_ADMIN_URL, UPDATE_DRIVER_PAY_URL, UPDATE_DRIVER_STATUS_URL, UPDATE_DRIVER_URL } from "./driver.urls";
import type { UpdateDriverRequestDto } from "../../dtos/driver/request/update-driver.request.dto";
import type { UpdateDriverResponseDto } from "../../dtos/driver/response/update-driver.response.dto";
import type { UpdateDriverByAdminRequestDto } from "../../dtos/driver/request/update-driver-by-admin.request.dto";
import type { UpdateDriverPayRequestDto } from "../../dtos/driver/request/update-driver-pay.request.dto";
import type { UpdateDriverPayResponseDto } from "../../dtos/driver/response/update-driver-pay.response.dto";
import type { UpdateDriverStatusRequestDto } from "../../dtos/driver/request/update-driver-status.request.dto";
import type PageDto from "../../dtos/page.dto";
import type { GetAllDriverResponseDto } from "../../dtos/driver/response/get-all-driver.response.dto";
import type { GetDriverDetailResponseDto } from "../../dtos/driver/response/get-driver-detail.response.dto";

export const createDriver = async(
    dto: CreateDriverRequestDto,
    accessToken: string
): Promise<ResponseDto<CreateDriverResponseDto>> => {
    try {
        const response = await axiosInstance.post(
            CREATE_DRIVER_URL,
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const updateDriver = async(
    dto: UpdateDriverRequestDto,
    accessToken: string
): Promise<ResponseDto<UpdateDriverResponseDto>> => {
    try {
        const response = await axiosInstance.put(
            UPDATE_DRIVER_URL,
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const updateDriverByAdmin = async(
    driverId: number,
    dto: UpdateDriverByAdminRequestDto,
    accessToken: string
): Promise<ResponseDto<UpdateDriverResponseDto>> => {
    try {
        const response = await axiosInstance.put(
            UPDATE_DRIVER_BY_ADMIN_URL(driverId),
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const updateDriverPay = async(
    driverId: number,
    dto: UpdateDriverPayRequestDto,
    accessToken: string
): Promise<ResponseDto<UpdateDriverPayResponseDto>> => {
    try {
        const response = await axiosInstance.put(
            UPDATE_DRIVER_PAY_URL(driverId),
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const updateDriverStatus = async(
    driverId: number,
    dto: UpdateDriverStatusRequestDto,
    accessToken: string
): Promise<ResponseDto<UpdateDriverResponseDto>> => {
    try {
        const response = await axiosInstance.put(
            UPDATE_DRIVER_STATUS_URL(driverId),
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const getAllDriver = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllDriverResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
        GET_ALL_DRIVER_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getMyInfo = async (
    accessToken: string
): Promise<ResponseDto<GetDriverDetailResponseDto>> => {
    try {
        const response = await axiosInstance.get(
            GET_MY_INFO_URL,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}

export const retiredDriver = async (
  driverId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      RETIRED_DRIVER_URL(driverId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) { 
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};