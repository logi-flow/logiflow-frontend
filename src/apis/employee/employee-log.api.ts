import type { AxiosError } from "axios";
import type { GetEmployeeUpdateLogResponseDto } from "../../dtos/employeeLog/get-employee-update-log.response.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_EMPLOYEE_STATUS_LOGS_URL, GET_EMPLOYEE_UPDATE_LOGS_URL } from "./employee.url";
import type { GetEmployeeStatusLogResponseDto } from "../../dtos/employeeLog/get-employee-status-log.response.dto";

export const getEmployeeUpdateLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetEmployeeUpdateLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_EMPLOYEE_UPDATE_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getEmployeeStatusLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetEmployeeStatusLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_EMPLOYEE_STATUS_LOGS_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}