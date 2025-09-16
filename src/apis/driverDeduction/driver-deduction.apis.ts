import { AxiosError } from "axios";
import type { CreateDriverDeductionRequestDto } from "../../dtos/driverDeduction/request/create-driver-deduction.request.dto";
import type { CreateDriverDeductionResponseDto } from "../../dtos/driverDeduction/response/create-driver-deduction.response.dto";
import type { GetDriverDeductionDetailResponseDto } from "../../dtos/driverDeduction/response/get-driver-deduction-detail.response.dto";
import type { UpdateDriverDeductionRequestDto } from "../../dtos/driverDeduction/request/update-driver-deduction.request.dto";
import type { UpdateDriverDeductionResponseDto } from "../../dtos/driverDeduction/response/update-driver-deduction.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_DRIVER_DEDUCTION_URL, DELETE_DRIVER_DEDUCTION_URL, GET_DRIVER_DEDUCTION_URL, UPDATE_DRIVER_DEDUCTION_URL } from "./driver-deduction.urls";

export const createDriverDeduction = async (
  payrollId: number,
  dto: CreateDriverDeductionRequestDto,
  accessToken: string
): Promise<ResponseDto<CreateDriverDeductionResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CREATE_DRIVER_DEDUCTION_URL(payrollId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getDriverDeduction = async (
  payrollId: number,
  accessToken: string
): Promise<ResponseDto<GetDriverDeductionDetailResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      GET_DRIVER_DEDUCTION_URL(payrollId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateDriverDeduction = async (
  payrollId: number,
  dto: UpdateDriverDeductionRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateDriverDeductionResponseDto[]>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_DRIVER_DEDUCTION_URL(payrollId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteDriverDeduction = async (
  payrollId: number,
  deductionId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_DRIVER_DEDUCTION_URL(payrollId, deductionId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};