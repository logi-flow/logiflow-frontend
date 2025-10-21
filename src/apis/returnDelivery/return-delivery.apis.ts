import type { AxiosError } from "axios";
import type ResponseDto from "../../dtos/response.dto";
import type { CreateReturnDeliveryRequestDto } from "../../dtos/returnDelivery/request/create-return-delivery.request.dto";
import {
  axiosInstance,
  bearerAuthorization,
  responseErrorHandler,
  responseSuccessHandler,
} from "../axios-config";
import type PageDto from "../../dtos/page.dto";
import type { GetAllReturnDeliveryResponseDto } from "../../dtos/returnDelivery/response/get-all-return-delivery.response.dto";
import type { GetReturnDeliveryDetailResponseDto } from "../../dtos/returnDelivery/response/get-return-delivery-detail.response.dto.ts";
import type { GetAllWaitingReturnDeliveryResponseDto } from "../../dtos/returnDelivery/response/get-all-waiting-return-delivery.response.dto.ts";
import type { UpdateReturnDeliveryRequestDto } from "../../dtos/returnDelivery/request/update-return-delivery.request.dto.ts";
import type { UpdateReturnDeliveryStatusRequestDto } from "../../dtos/returnDelivery/request/update-return-delivery-status.request.dto.ts";
import type { UpdateDeliveryIsHiddenRequestDto } from "../../dtos/delivery/request/update-delivery-is-hidden.request.dto.ts";
import {
  CREATE_RETURN_DELIVERY_URL,
  DELETE_RETURN_DELIVERY_URL,
  GET_ALL_RETURN_DELIVERY_URL,
  GET_ALL_WAITING_RETURN_DELIVERY_URL,
  GET_MY_RETURN_DELIVERY_URL,
  GET_RETURN_DELIVERY_DETAIL_URL,
  UPDATE_RETURN_DELIVERY_IS_HIDDEN_URL,
  UPDATE_RETURN_DELIVERY_STATUS_CANCEL_URL,
  UPDATE_RETURN_DELIVERY_STATUS_URL,
  UPDATE_RETURN_DELIVERY_URL,
} from "./return-delivery.urls.ts";

export const createReturnDelivery = async (
  deliveryId: number,
  dto: CreateReturnDeliveryRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(
      CREATE_RETURN_DELIVERY_URL(deliveryId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllReturnDelivery = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllReturnDeliveryResponseDto>>> => {
  try {
    const response = await axiosInstance.get(GET_ALL_RETURN_DELIVERY_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken),
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getReturnDeliveryDetail = async (
  returnDeliveryId: number,
  accessToken: string
): Promise<ResponseDto<GetReturnDeliveryDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_RETURN_DELIVERY_DETAIL_URL(returnDeliveryId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getMyReturnDelivery = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<GetAllReturnDeliveryResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_MY_RETURN_DELIVERY_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken),
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllWaitingReturnDelivery = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<GetAllWaitingReturnDeliveryResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_WAITING_RETURN_DELIVERY_URL,
      {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken),
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updteReturnDelivery = async (
  returnDeliveryId: number,
  dto: UpdateReturnDeliveryRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_RETURN_DELIVERY_URL(returnDeliveryId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateReturnDeliveryStatus = async (
  returnDeliveryId: number,
  dto: UpdateReturnDeliveryStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_RETURN_DELIVERY_STATUS_URL(returnDeliveryId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updteReturnDeliveryStatusCancel = async (
  returnDeliveryId: number,
  dto: UpdateReturnDeliveryStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_RETURN_DELIVERY_STATUS_CANCEL_URL(returnDeliveryId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updteReturnDeliveryIsHidden = async (
  returnDeliveryId: number,
  dto: UpdateDeliveryIsHiddenRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_RETURN_DELIVERY_IS_HIDDEN_URL(returnDeliveryId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteReturnDelivery = async (
  returnDeliveryId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_RETURN_DELIVERY_URL(returnDeliveryId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
