import type { AxiosError } from "axios";
import type { GetDriverPayrollUpdateLogResponseDto } from "../../dtos/driverPayrollLog/response/get-driver-payroll-update-log.response.dto";
import type { GetDriverPayrollStatusLogResponseDto } from "../../dtos/driverPayrollLog/response/get-driver-payroll-status-log.response.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_DRIVER_PAYROLL_STATUS_LOGS_URL, GET_DRIVER_PAYROLL_UPDATE_LOGS_URL } from "./driver-payroll.urls";

export const getDriverPayrollUpdateLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetDriverPayrollUpdateLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_DRIVER_PAYROLL_UPDATE_LOGS_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getDriverPayrollStatusLogs = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetDriverPayrollStatusLogResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_DRIVER_PAYROLL_STATUS_LOGS_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};