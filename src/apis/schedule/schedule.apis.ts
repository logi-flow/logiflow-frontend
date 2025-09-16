import type { AxiosError } from "axios";
import type ResponseDto from "../../dtos/response.dto";
import type { UpdateScheduleRequestDto } from "../../dtos/schedule/request/update-schedule.request.dto";
import type { GetScheduleResponseDto } from "../../dtos/schedule/response/get-schedule.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_ALL_SCHEDULE_URL, GET_MY_SCHEDULE_URL, GET_SCHEDULE_BY_DRIVER_URL, GET_SCHEDULE_DETAIL_URL, UPDATE_SCHEDULE_URL } from "./schedule.urls";
import type { GetAllScheduleResponseDto } from "../../dtos/schedule/response/get-all-schedule.response.dto";
import type PageDto from "../../dtos/page.dto";

export const updateSchedule = async (
  scheduleId: number,
  dto: UpdateScheduleRequestDto,
  accessToken: string
): Promise<ResponseDto<GetScheduleResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_SCHEDULE_URL(scheduleId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllSchedule = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllScheduleResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_SCHEDULE_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getSchedule = async (
  scheduleId: number,
  accessToken: string
): Promise<ResponseDto<GetScheduleResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_SCHEDULE_DETAIL_URL(scheduleId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getScheduleByDriver = async (
  driverId: number,
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllScheduleResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_SCHEDULE_BY_DRIVER_URL(driverId), {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getMySchedule = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllScheduleResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_MY_SCHEDULE_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}