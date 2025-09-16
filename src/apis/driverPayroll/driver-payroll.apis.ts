import type { AxiosError } from "axios";
import type { CreateDriverPayrollRequestDto } from "../../dtos/driverPayroll/request/create-driver-payroll.request.dto";
import type { CreateDriverPayrollResponseDto } from "../../dtos/driverPayroll/response/create-driver-payroll.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_DRIVER_PAYROLL_URL, DELETE_DRIVER_PAYROLL_URL, GET_ALL_DRIVER_PAYROLL_URL, GET_ALL_MY_PAYROLL_URL, GET_DRIVER_PAYROLL_DETAIL_URL, GET_MY_PAYROLL_DETAIL_URL, UPDATE_DRIVER_PAYROLL_STATUS_URL, UPDATE_DRIVER_PAYROLL_URL } from "./driver-payroll.urls";
import type { GetAllDriverPayrollResponseDto } from "../../dtos/driverPayroll/response/get-all-driver-payroll.response.dto";
import type PageDto from "../../dtos/page.dto";
import type { GetDriverPayrollDetailResponseDto } from "../../dtos/driverPayroll/response/get-driver-payroll-detail.response.dto";
import type { UpdateDriverPayrollRequestDto } from "../../dtos/driverPayroll/request/update-driver-payroll.request.dto";
import type { UpdateDriverPayrollResponseDto } from "../../dtos/driverPayroll/response/update-driver-payroll.response.dto";
import type { UpdateDriverPayrollStatusRequestDto } from "../../dtos/driverPayroll/request/update-driver-payroll-status.request.dto";
import type { UpdateDriverPayrollStatusResponseDto } from "../../dtos/driverPayroll/response/update-driver-payroll-status.response.dto";

export const createDriverPayroll = async (
  dto: CreateDriverPayrollRequestDto,
  accessToken: string
): Promise<ResponseDto<CreateDriverPayrollResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CREATE_DRIVER_PAYROLL_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllDriverPayroll = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllDriverPayrollResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_DRIVER_PAYROLL_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getDriverPayrollDetail = async (
  payrollId: number,
  accessToken: string
): Promise<ResponseDto<GetDriverPayrollDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_DRIVER_PAYROLL_DETAIL_URL(payrollId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllMyPayroll = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllDriverPayrollResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_MY_PAYROLL_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getMyPayrollDetail = async (
  payrollId: number,
  accessToken: string
): Promise<ResponseDto<GetDriverPayrollDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_MY_PAYROLL_DETAIL_URL(payrollId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateDriverPayroll = async (
  payrollId: number,
  dto: UpdateDriverPayrollRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateDriverPayrollResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_DRIVER_PAYROLL_URL(payrollId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateDriverPayrollStatus = async (
  payrollId: number,
  dto: UpdateDriverPayrollStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateDriverPayrollStatusResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_DRIVER_PAYROLL_STATUS_URL(payrollId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteDriverPayroll = async (
  payrollId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_DRIVER_PAYROLL_URL(payrollId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};