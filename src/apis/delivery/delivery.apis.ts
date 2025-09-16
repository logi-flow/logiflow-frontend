import type { AxiosError } from "axios";
import type { CreateDeliveryRequestDto } from "../../dtos/delivery/request/create-delivery.request.dto";
import type { GetDeliveryResponseDto } from "../../dtos/delivery/response/get-delivery.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CANCEL_DELIVERY_URL, CREATE_DELIVERY_URL, DELETE_DELIVERY_URL, GET_ALL_DELIVERY_URL, GET_ALL_WAITING_DELIVERY_URL, GET_DELIVERY_DETAIL_URL, GET_MY_DELIVERY_URL, UPDATE_DELIVERY_IS_HIDDEN_URL, UPDATE_DELIVERY_STATUS_URL, UPDATE_DELIVERY_URL } from "./delivery.urls";
import type PageDto from "../../dtos/page.dto";
import type { GetAllDeliveryResponseDto } from "../../dtos/delivery/response/get-all-delivery.response.dto";
import type { UpdateDeliveryIsHiddenRequestDto } from "../../dtos/delivery/request/update-delivery-is-hidden.request.dto";
import type { UpdateDeliveryRequestDto } from "../../dtos/delivery/request/update-delivery.request.dto";
import type { UpdateDeliveryStatusRequestDto } from "../../dtos/delivery/request/update-delivery-status.request.dto";
import type { GetAllWaitingDeliveryResponseDto } from "../../dtos/delivery/response/get-all-waiting-delivery.response.dto";

export const createDelivery = async (
  dto: CreateDeliveryRequestDto,
  accessToken: string
): Promise<ResponseDto<GetDeliveryResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CREATE_DELIVERY_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllDelivery = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllDeliveryResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_DELIVERY_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getDeliveryDetail = async (
  deliveryId: number,
  accessToken: string
): Promise<ResponseDto<GetDeliveryResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_DELIVERY_DETAIL_URL(deliveryId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getMyDelivery = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllDeliveryResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_MY_DELIVERY_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateDeliveryIsHidden = async (
  deliveryId: number,
  dto: UpdateDeliveryIsHiddenRequestDto,
  accessToken: string
): Promise<ResponseDto<GetDeliveryResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_DELIVERY_IS_HIDDEN_URL(deliveryId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateDelivery = async (
  deliveryId: number,
  dto: UpdateDeliveryRequestDto,
  accessToken: string
): Promise<ResponseDto<GetDeliveryResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_DELIVERY_URL(deliveryId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateDeliveryStatus = async (
  deliveryId: number,
  dto: UpdateDeliveryStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<GetDeliveryResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_DELIVERY_STATUS_URL(deliveryId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const cancelDelivery = async (
  deliveryId: number,
  dto: UpdateDeliveryStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<GetDeliveryResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      CANCEL_DELIVERY_URL(deliveryId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteDelivery = async (
  deliveryId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_DELIVERY_URL(deliveryId),
      bearerAuthorization(accessToken)
    )
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllWaitingDelivery = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllWaitingDeliveryResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_WAITING_DELIVERY_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
