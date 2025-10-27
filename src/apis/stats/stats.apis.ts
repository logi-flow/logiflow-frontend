import type { AxiosError } from "axios";
import type ResponseDto from "../../dtos/response.dto";
import type { GetDriverJoinLeaveResponseDto } from "../../dtos/stats/driverJoinLeave/response/get-driver-join-leave.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { GET_DRIVER_JOIN_LEAVE_URL } from "./stats.urls";

export const getDrvierJoinLeave = async (
  accessToken: string,
  from?: string,
  to?: string
): Promise<ResponseDto<GetDriverJoinLeaveResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_DRIVER_JOIN_LEAVE_URL, {
        params: { from, to },
        ...bearerAuthorization(accessToken)
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};