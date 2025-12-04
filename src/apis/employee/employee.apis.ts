import type { AxiosError } from "axios";
import type { CreateEmployeeRequestDto } from "../../dtos/employee/request/create-employee-reqeust.dto";
import type { CreateEmployeeResponseDto } from "../../dtos/employee/response/create-employee.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { EMPLOYEE_ID_URL, EMPLOYEE_MODULE_URL, EMPLOYEE_MY_INFO_URL, EMPLOYEE_STATUS_URL } from "./employee.url";
import type { UpdateEmployeeRequestDto } from "../../dtos/employee/request/update-employee.request.dto";
import type { UpdateEmployeeResponseDto } from "../../dtos/employee/response/update-employee.response.dto";
import type { GetEmployeeDetailResponseDto } from "../../dtos/employee/response/get-employee-detail.response.dto";
import type { UpdateEmployeeAdminRequestDto } from "../../dtos/employee/request/update-employee-admin.request.dto";
import type { UpdateEmployeeStatusRequestDto } from "../../dtos/employee/request/update-employee-status.request.dto";
import type { UpdateEmployeeStatusResponseDto } from "../../dtos/employee/response/update-employee-status.response.dto";
import type PageDto from "../../dtos/page.dto";
import type { GetAllEmployeeResponseDto } from "../../dtos/employee/response/get-all-employee.response.dto";
import type { GetEmployeeDetailAdminResponseDto } from "../../dtos/employee/response/get-employee-detail-damin.response.dto";

export const createEmployee = async (
  dto: CreateEmployeeRequestDto,
  profileImage: File | null,
  accessToken: string
) : Promise<ResponseDto<CreateEmployeeResponseDto>> => {
  try {
    const formData = new FormData();
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const response = await axiosInstance.post(
      EMPLOYEE_MODULE_URL,
      formData,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateEmployee = async (
  dto: UpdateEmployeeRequestDto,
  accessToken: string
) : Promise<ResponseDto<UpdateEmployeeResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      EMPLOYEE_MY_INFO_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getEmployeeDetail = async (
  accessToken: string
) : Promise<ResponseDto<GetEmployeeDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      EMPLOYEE_MY_INFO_URL,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateEmployeeAdmin = async (
  employeeId: number,
  dto: UpdateEmployeeAdminRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateEmployeeResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      `${EMPLOYEE_ID_URL}/${employeeId}`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateEmployeeStatus = async (
  employeeId: number,
  dto: UpdateEmployeeStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateEmployeeStatusResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      `${EMPLOYEE_STATUS_URL}/${employeeId}`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllEmployee = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllEmployeeResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      EMPLOYEE_MODULE_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getEmployeeDetailAdmin = async (
  employeeId: number,
  accessToken: string
): Promise<ResponseDto<GetEmployeeDetailAdminResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      `${EMPLOYEE_ID_URL}/${employeeId}`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};