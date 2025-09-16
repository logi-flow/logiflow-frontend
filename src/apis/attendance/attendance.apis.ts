import type { AxiosError } from "axios";
import type { CreateAttendanceResponseDto } from "../../dtos/attendance/response/create-attendance.response.dto";
import type { UpdateAttendanceResponseDto } from "../../dtos/attendance/response/update-attendance.response.dto";
import type { UpdateAttendanceRequestDto } from "../../dtos/attendance/request/update-attendance.request.dto";
import type { GetAllAttendanceResponseDto } from "../../dtos/attendance/response/get-all-attendance.response.dto";
import type { GetAttendanceDetailResponseDto } from "../../dtos/attendance/response/get-attendance-detail.response.dto";
import type { GetMyAttendanceDetailResponseDto } from "../../dtos/attendance/response/get-my-attendance-detail.response.dto";
import type { GetAllMyAttendanceResponseDto } from "../../dtos/attendance/response/get-all-my-attendance.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import type PageDto from "../../dtos/page.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CHECK_IN_ATTENDANCE_URL, CHECK_OUT_ATTENDANCE_URL, GET_ALL_ATTENDANCE_URL, GET_ATTENDANCE_DETAIL_URL, GET_ALL_MY_ATTENDANCE_URL, GET_MY_ATTENDANCE_URL } from "./attendance.urls";

export const checkInAttendance = async (
  accessToken: string
): Promise<ResponseDto<CreateAttendanceResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CHECK_IN_ATTENDANCE_URL,
      null,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const checkOutAttendance = async (
  dto: UpdateAttendanceRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateAttendanceResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      CHECK_OUT_ATTENDANCE_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllAttendance = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllAttendanceResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_ATTENDANCE_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAttendanceDetail = async (
  attendanceId: number,
  accessToken: string
): Promise<ResponseDto<GetAttendanceDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_ATTENDANCE_DETAIL_URL(attendanceId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getMyAttendance = async (
  accessToken: string
): Promise<ResponseDto<GetMyAttendanceDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_MY_ATTENDANCE_URL,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllMyAttendance = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllMyAttendanceResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_MY_ATTENDANCE_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};