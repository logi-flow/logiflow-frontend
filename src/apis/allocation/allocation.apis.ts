import type { AxiosError } from "axios";
import type { CreateAllocationRequestDto } from "../../dtos/allocation/request/create-allocation.request.dto";
import type { CreateAllocationResponseDto } from "../../dtos/allocation/response/create-allocation.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import type ResponseDto from "../../dtos/response.dto";
import { CREATE_ALLOCATION_URL, UPDATE_ALLOCATION_STATUS_URL, UPDATE_ALLOCATION_URL } from "./allocation.urls";
import type { UpdateAllocationRequestDto } from "../../dtos/allocation/request/update-allocation.request.dto";
import type { UpdateAllocationResponseDto } from "../../dtos/allocation/response/update-allocation.response.dto";
import type { UpdateAllocationStatusRequestDto } from "../../dtos/allocation/request/update-allocation-status.request.dto";

export const createAllocation = async (
  dto: CreateAllocationRequestDto,
  accessToken: string
): Promise<ResponseDto<CreateAllocationResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CREATE_ALLOCATION_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateAllocation = async (
  allocationId: number,
  dto: UpdateAllocationRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateAllocationResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_ALLOCATION_URL(allocationId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateAllocationStatus = async (
  allocationId: number,
  dto: UpdateAllocationStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateAllocationResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_ALLOCATION_STATUS_URL(allocationId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}