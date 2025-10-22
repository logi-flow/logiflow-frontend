import type { AxiosError } from "axios";
import type { UpdateCustomerRequestDto } from "../../dtos/customer/request/update-customer.request.dto";
import type { UpdateCustomerResponseDto } from "../../dtos/customer/response/update-customer.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CUSTOMER_ID_URL, CUSTOMER_MODULE_URL, CUSTOMER_MY_INFO_URL, CUSTOMER_STATUS_URL } from "./customer.urls";
import type { GetCustomerDetailResponseDto } from "../../dtos/customer/response/get-customer-detail.response.dto";
import type PageDto from "../../dtos/page.dto";
import type { GetAllCustomerResponseDto } from "../../dtos/customer/response/get-all-customer.response.dto";
import type { UpdateCustomerAdminRequestDto } from "../../dtos/customer/request/update-customer-admin.request.dto";
import type { UpdateCustomerStatusRequestDto } from "../../dtos/customer/request/update-customer-status.request.dto";
import type { UpdateCustomerStatusResponseDto } from "../../dtos/customer/response/update-customer-status.response.dto";

export const updateCustomer = async (
  dto: UpdateCustomerRequestDto,
  accessToken: string
) : Promise<ResponseDto<UpdateCustomerResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      CUSTOMER_MY_INFO_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getCustomerDetail = async (
  accessToken: string
) : Promise<ResponseDto<GetCustomerDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      CUSTOMER_MY_INFO_URL,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateCustomerAdmin = async (
  customerId: number,
  dto: UpdateCustomerAdminRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateCustomerResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      `${CUSTOMER_ID_URL}/${customerId}`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateCustomerStatus = async (
  customerId: number,
  dto: UpdateCustomerStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateCustomerStatusResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      `${CUSTOMER_STATUS_URL}/${customerId}`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllCustomer = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllCustomerResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      CUSTOMER_MODULE_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getCustomerDetailAdmin = async (
  customerId: number,
  accessToken: string
): Promise<ResponseDto<GetCustomerDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      `${CUSTOMER_ID_URL}/${customerId}`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteCustomer = async (
  accessToken: string
) : Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      CUSTOMER_MY_INFO_URL,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};