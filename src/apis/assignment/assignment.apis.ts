import type { AxiosError } from "axios";
import type { CreateAssignmentRequestDto } from "../../dtos/assignment/request/create-assignment.request.dto";
import type { CreateAssignmentResponseDto } from "../../dtos/assignment/response/create-assignment.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_ASSIGNMENT_URL, DELETE_ASSIGNMENT_URL, GET_ALL_ASSIGNMENT_URL, GET_ASSIGNMENT_DETAIL_URL, GET_MY_ASSIGNMENT_URL, UPDATE_ASSIGNMENT_STATUS_URL, UPDATE_ASSIGNMENT_URL } from "./assignment.urls";
import type { UpdateAssignmentRequestDto } from "../../dtos/assignment/request/update-assignment.request.dto";
import type { UpdateAssignmentResponseDto } from "../../dtos/assignment/response/update-assignment.response.dto";
import type { UpdtateAssignmentStatusRequestDto } from "../../dtos/assignment/request/update-assignment-status.request.dto";
import type { GetAssignmentDetailResponseDto } from "../../dtos/assignment/response/get-assignment-detail.response.dto";
import type PageDto from "../../dtos/page.dto";
import type { GetAllAssignmentResponseDto } from "../../dtos/assignment/response/get-all-assignment.response.dto";

export const createAssignment = async (
    dto: CreateAssignmentRequestDto,
    accessToken: string
): Promise<ResponseDto<CreateAssignmentResponseDto>> => {
    try {
        const response = await axiosInstance.post(
            CREATE_ASSIGNMENT_URL,
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const updateAssignment = async(
    assignmentId: number,
    dto: UpdateAssignmentRequestDto,
    accessToken: string
): Promise<ResponseDto<UpdateAssignmentResponseDto>> => {
    try {
        const response = await axiosInstance.put(
            UPDATE_ASSIGNMENT_URL(assignmentId),
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const updateAssignmentStatus = async(
    assignmentId: number,
    dto: UpdtateAssignmentStatusRequestDto,
    accessToken: string
): Promise<ResponseDto<UpdateAssignmentResponseDto>> => {
    try {
        const response = await axiosInstance.put(
            UPDATE_ASSIGNMENT_STATUS_URL(assignmentId),
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const getMyAssignment = async(
    accessToken: string
): Promise<ResponseDto<GetAssignmentDetailResponseDto>> => {
    try {
        const response = await axiosInstance.get(
            GET_MY_ASSIGNMENT_URL,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const getAllAssignment = async (
  page: number,
  size: number,
  sort: string,
  accessToken: string
): Promise<ResponseDto<PageDto<GetAllAssignmentResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      GET_ALL_ASSIGNMENT_URL, {
        params: { page, size, sort },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAssignmentDetail = async(
    assignmentId: number,
    accessToken: string
): Promise<ResponseDto<GetAssignmentDetailResponseDto>> => {
    try {
        const response = await axiosInstance.get(
            GET_ASSIGNMENT_DETAIL_URL(assignmentId),
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const deleteAssignment = async(
    assignmentId: number,
    accessToken: string
): Promise<ResponseDto<void>> => {
    try {
        const response = await axiosInstance.delete(
            DELETE_ASSIGNMENT_URL(assignmentId),
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};