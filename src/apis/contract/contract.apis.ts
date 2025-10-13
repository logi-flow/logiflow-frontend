import type { AxiosError } from "axios";
import type { GetContractResponseDto } from "../../dtos/contract/response/get-contract.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_CONTRACT_URL, DELETE_CONTRACT_URL, GET_ALL_CONTRACT_URL, GET_CONTRACT_DETAIL_URL, GET_MY_CONTRACT_URL, UPDATE_CONTRACT_STATUS_URL, UPDATE_CONTRACT_URL } from "./contract.urls";
import type { UpdateContractRequestDto } from "../../dtos/contract/request/update-contract.request.dto";
import type { UpdateContractStatusRequestDto } from "../../dtos/contract/request/update-contract-status.request.dto";
import type PageDto from "../../dtos/page.dto";
import type { GetAllContractResponseDto } from "../../dtos/contract/response/get-all-contract.response.dto";
import type { CreateContractRequestDto } from "../../dtos/contract/request/create-contract.request.dto";

export const createContract = async (
  customerId: number,
  dto: CreateContractRequestDto,
  accessToken: string
): Promise<ResponseDto<GetContractResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      `${CREATE_CONTRACT_URL}/${customerId}`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateContract = async (
  contractId: number,
  dto: UpdateContractRequestDto,
  accessToken: string
): Promise<ResponseDto<GetContractResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_CONTRACT_URL(contractId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateContractStatus = async (
  contractId: number,
  dto: UpdateContractStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<GetContractResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_CONTRACT_STATUS_URL(contractId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllContract = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllContractResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_CONTRACT_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getContractDetail = async (
  contractId: number,
  accessToken: string
): Promise<ResponseDto<GetContractResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_CONTRACT_DETAIL_URL(contractId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getMyContract = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllContractResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_MY_CONTRACT_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteContract = async (
  contractId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_CONTRACT_URL(contractId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};