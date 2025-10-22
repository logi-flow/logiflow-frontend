import type { AxiosError } from "axios";
import type { CreateDriverLicenseRequestDto } from "../../dtos/driverLicense/request/create-driver-license.request.dto";
import type { CreateDriverLicenseResponseDto } from "../../dtos/driverLicense/response/create-driver-license.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CREATE_DRIVER_LICENSE_URL, UPDATE_DRIVER_LICENSE_URL } from "./dirver-license.urls";
import type { UpdateDriverLicenseRequestDto } from "../../dtos/driverLicense/request/update-driver-license.request.dto";
import type { UpdateDriverLicenseResponseDto } from "../../dtos/driverLicense/response/update-driver-license.response.dto";

export const createDriverLicense = async (
    driverId: number,
    dto: CreateDriverLicenseRequestDto,
    accessToken: string
): Promise<ResponseDto<CreateDriverLicenseResponseDto>> => {
    try {
        const response = await axiosInstance.post(
            CREATE_DRIVER_LICENSE_URL(driverId),
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};

export const updateDriverLicense = async (
    driverId: number,
    licenseId: number,
    dto: UpdateDriverLicenseRequestDto,
    accessToken: string
): Promise<ResponseDto<UpdateDriverLicenseResponseDto>> => {
    try {
        const response = await axiosInstance.post(
            UPDATE_DRIVER_LICENSE_URL(driverId, licenseId),
            dto,
            bearerAuthorization(accessToken)
        );
        return responseSuccessHandler(response);
    } catch (error) {
        return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
};