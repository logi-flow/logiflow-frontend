import type { AxiosError } from "axios";
import type { CreateAllowanceTypeRequestDto } from "../../dtos/allowanceType/request/create-allowance-type.request.dto";
import type { CreateAllowanceTypeResponseDto } from "../../dtos/allowanceType/response/create-allowance-type.response.dto";
import type { GetAllAllowanceTypeResponseDto } from "../../dtos/allowanceType/response/get-all-allowance-type.response.dto";
import type { GetAllowanceTypeDetailResponseDto } from "../../dtos/allowanceType/response/get-allowance-type-detail.response.dto";
import type { UpdateAllowanceTypeResponseDto } from "../../dtos/allowanceType/response/update-allowance-type.response.dto";
import type { UpdateAllowanceTypeRequestDto } from "../../dtos/allowanceType/request/update-allowance-type.request.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_ALLOWANCE_TYPE_URL, DELETE_ALLOWANCE_TYPE_URL, GET_ALL_ALLOWANCE_TYPE_URL, GET_ALLOWANCE_TYPE_DETAIL_URL, UPDATE_ALLOWANCE_TYPE_URL } from "./allowance-type.urls";

export const createAllowanceType = async (
  dto: CreateAllowanceTypeRequestDto,
  accessToken: string
): Promise<ResponseDto<CreateAllowanceTypeResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CREATE_ALLOWANCE_TYPE_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllAllowanceType = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllAllowanceTypeResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_ALLOWANCE_TYPE_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllowanceTypeDetail = async (
  allowanceTypeId: number,
  accessToken: string
): Promise<ResponseDto<GetAllowanceTypeDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALLOWANCE_TYPE_DETAIL_URL(allowanceTypeId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateAllowanceType = async (
  allowanceTypeId: number,
  dto: UpdateAllowanceTypeRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateAllowanceTypeResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_ALLOWANCE_TYPE_URL(allowanceTypeId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteAllowanceType = async (
  allowanceTypeId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_ALLOWANCE_TYPE_URL(allowanceTypeId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) { 
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};