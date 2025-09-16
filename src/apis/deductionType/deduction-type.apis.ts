import type { AxiosError } from "axios";
import type { CreateDeductionTypeRequestDto } from "../../dtos/deductionType/request/create-deduction-type.request.dto";
import type { CreateDeductionTypeResponseDto } from "../../dtos/deductionType/response/create-deduction-type.response.dto";
import type { GetAllDeductionTypeResponseDto } from "../../dtos/deductionType/response/get-all-deduction-type.response.dto";
import type { GetDeductionTypeDetailResponseDto } from "../../dtos/deductionType/response/get-deduction-type-detail.response.dto";
import type { UpdateDeductionTypeRequestDto } from "../../dtos/deductionType/request/update-deduction-type.request.dto";
import type { UpdateDeductionTypeResponseDto } from "../../dtos/deductionType/response/update-deduction-type.response.dto";
import type PageDto from "../../dtos/page.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_DEDUCTION_TYPE_URL, DELETE_DEDUCTION_TYPE_URL, GET_ALL_DEDUCTION_TYPE_URL, GET_DEDUCTION_TYPE_DETAIL_URL, UPDATE_DEDUCTION_TYPE_URL } from "./deduction-type.urls";


export const createDeductionType = async (
  dto: CreateDeductionTypeRequestDto,
  accessToken: string
): Promise<ResponseDto<CreateDeductionTypeResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CREATE_DEDUCTION_TYPE_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllDeductionType = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllDeductionTypeResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_DEDUCTION_TYPE_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getDeductionTypeDetail = async (
  deductionTypeId: number,
  accessToken: string
): Promise<ResponseDto<GetDeductionTypeDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_DEDUCTION_TYPE_DETAIL_URL(deductionTypeId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateDeductionType = async (
  deductionTypeId: number,
  dto: UpdateDeductionTypeRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateDeductionTypeResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_DEDUCTION_TYPE_URL(deductionTypeId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteDeductionType = async (
  deductionTypeId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_DEDUCTION_TYPE_URL(deductionTypeId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) { 
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};