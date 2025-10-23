import type { AxiosError } from "axios";
import type ResponseDto from "../../dtos/response.dto";
import type { CreateVehicleRequestDto } from "../../dtos/vehicle/request/create-vehicle.request.dto";
import type { CreateVehicleResponseDto } from "../../dtos/vehicle/response/create-vehicle.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_VEHICLE_URL, DELETE_VEHICLE_URL, GET_ALL_VEHICLE_URL, GET_VEHICLE_DETAIL_URL, UPDATE_VEHICLE_STATUS_URL, UPDATE_VEHICLE_URL } from "./vehicle.urls";
import type { UpdateVehicleResponseDto } from "../../dtos/vehicle/response/update-vehicle.response.dto";
import type { UpdateVehicleRequestDto } from "../../dtos/vehicle/request/update-vehicle.request.dto";
import type { UpdateVehicleStatusRequestDto } from "../../dtos/vehicle/request/update-vehicle-status.request.dto";
import type PageDto from "../../dtos/page.dto";
import type { GetAllVehicleRseponseDto } from "../../dtos/vehicle/response/get-all-vehicle.response.dto";
import type { GetVehicleDetailRseponseDto } from "../../dtos/vehicle/response/get-vehicle-detail.response.dto";

export const createVehicle = async (
    dto: CreateVehicleRequestDto,
    accessToken: string
): Promise<ResponseDto<CreateVehicleResponseDto>> => {
    try {
        const response = await axiosInstance.post(
            CREATE_VEHICLE_URL,
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const updateVehicle = async (
    vehicleId: number,
    dto: UpdateVehicleRequestDto,
    accessToken: string
): Promise<ResponseDto<UpdateVehicleResponseDto>> => {
    try {
        const response = await axiosInstance.put(
            UPDATE_VEHICLE_URL(vehicleId),
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};
export const updateVehicleStatus = async (
    vehicleId: number,
    dto: UpdateVehicleStatusRequestDto,
    accessToken: string
): Promise<ResponseDto<UpdateVehicleResponseDto>> => {
    try {
        const response = await axiosInstance.put(
            UPDATE_VEHICLE_STATUS_URL(vehicleId),
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const getAllVehicle = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllVehicleRseponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_VEHICLE_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getVehicleDetail = async (
    vehicleId: number,
    accessToken: string
): Promise<ResponseDto<GetVehicleDetailRseponseDto>> => {
    try {
        const response = await axiosInstance.get(
            GET_VEHICLE_DETAIL_URL(vehicleId),
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const deleteVehicle = async (
  vehicleId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_VEHICLE_URL(vehicleId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) { 
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};