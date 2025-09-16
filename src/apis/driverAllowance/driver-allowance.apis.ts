import { AxiosError } from "axios";
import type { CreateDriverAllowanceRequestDto } from "../../dtos/driverAllowance/request/create-driver-allowance.request.dto";
import type { CreateDriverAllowanceResponseDto } from "../../dtos/driverAllowance/response/create-driver-allowance.response.dto";
import type { GetDriverAllowanceDetailResponseDto } from "../../dtos/driverAllowance/response/get-driver-allowance-detail.response.dto";
import type { UpdateDriverAllowanceRequestDto } from "../../dtos/driverAllowance/request/update-driver-allowance.request.dto";
import type { UpdateDriverAllowanceResponseDto } from "../../dtos/driverAllowance/response/update-driver-allowance.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_DRIVER_ALLOWANCE_URL, DELETE_DRIVER_ALLOWANCE_URL, GET_DRIVER_ALLOWANCE_URL, UPDATE_DRIVER_ALLOWANCE_URL } from "./driver-allowance.urls";

export const createDriverAllowance = async (
  payrollId: number,
  dto: CreateDriverAllowanceRequestDto,
  accessToken: string
): Promise<ResponseDto<CreateDriverAllowanceResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CREATE_DRIVER_ALLOWANCE_URL(payrollId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getDriverAllowance = async (
  payrollId: number,
  accessToken: string
): Promise<ResponseDto<GetDriverAllowanceDetailResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      GET_DRIVER_ALLOWANCE_URL(payrollId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateDriverAllowance = async (
  payrollId: number,
  dto: UpdateDriverAllowanceRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateDriverAllowanceResponseDto[]>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_DRIVER_ALLOWANCE_URL(payrollId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteDriverAllowance = async (
  payrollId: number,
  allowanceId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_DRIVER_ALLOWANCE_URL(payrollId, allowanceId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};