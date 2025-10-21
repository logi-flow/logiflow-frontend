import type { AxiosError } from "axios";
import type { CreateCollectionSiteRequestDto } from "../../dtos/collectionSite/request/create-collection-site.request.dto";
import type { CreateCollectionSiteResponseDto } from "../../dtos/collectionSite/response/create-collection-site.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_COLLECTION_SITE_URL, DELETE_COLLECTION_SITE_URL, GET_ALL_COLLECTION_SITE_URL, UPDATE_COLLECTION_SITE_URL } from "./collection-site.urls";
import type { UpdateCollectionSiteRequestDto } from "../../dtos/collectionSite/request/update-collection-site.request.dto";
import type { UpdateCollectionSiteResponseDto } from "../../dtos/collectionSite/response/update-collection-site.response.dto";
import type PageDto from "../../dtos/page.dto";
import type { GetAllCollectionSiteResponseDto } from "../../dtos/collectionSite/response/get-all-collection-site.response.dto";

export const createCollectionSite = async (
  dto: CreateCollectionSiteRequestDto,
  accessToken: string
): Promise<ResponseDto<CreateCollectionSiteResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CREATE_COLLECTION_SITE_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const updateCollectionSite = async (
  collectionSiteId: number,
  dto: UpdateCollectionSiteRequestDto,
  accessToken: string
): Promise<ResponseDto<UpdateCollectionSiteResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_COLLECTION_SITE_URL(collectionSiteId),
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllCollectionSite = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllCollectionSiteResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_COLLECTION_SITE_URL, {
      params: { page, size, sort },
      ...bearerAuthorization(accessToken)
    }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteCollectionSite = async (
  collectionSiteId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_COLLECTION_SITE_URL(collectionSiteId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}