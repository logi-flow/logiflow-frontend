import type { AxiosError } from "axios";
import type { CustomerSignUpRequestDto } from "../../dtos/auth/request/customer-sign-up.request.dto";
import type { CustomerSignUpResponseDto } from "../../dtos/auth/response/customer-sign-up.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axios-config";
import { CUSTOMER_FIND_ID_URL, CUSTOMER_RESET_PASSWORD_URL, EXIST_BUSINESS_NUMBER_URL, EXIST_EMAIL_URL, EXIST_ID_URL, LOGIN_URL, MUST_CHANGE_PASSWORD_URL, RESET_PASSWORD_URL, SIGNUP_URL, USER_FIND_ID_URL, USER_RESET_PASSWORD_URL, VERIFY_EMAIL_URL } from "./auth.urls";
import type { LoginResponseDto } from "../../dtos/auth/response/login.response.dto";
import type { LoginRequestDto } from "../../dtos/auth/request/login.request.dto";
import type { EmailCheckResponseDto } from "../../dtos/auth/response/email-check.response.dto";
import type { CustomerLoginIdFindRequestDto } from "../../dtos/auth/request/customer-login-id-find.request.dto";
import type { BusinessNumberCheckResponseDto } from "../../dtos/auth/response/business-number-check.respone.dto";
import type { UsernameCheckResponseDto } from "../../dtos/auth/response/username-check.response.dto";
import type { CustomerLoginIdFindResponseDto } from "../../dtos/auth/response/customer-login-id-find.response.dto";
import type { UserLoginIdFindRequestDto } from "../../dtos/auth/request/user-login-find.request.dto";
import type { UserLoginIdFindResponseDto } from "../../dtos/auth/response/user-login-id-find.response.dto";
import type { CustomerPasswordResetRequestDto } from "../../dtos/auth/request/customer-password-reset.request.dto";
import type { CustomerPasswordResetResponseDto } from "../../dtos/auth/response/customer-password-reset.response.dto";
import type { UserPasswordResetRequestDto } from "../../dtos/auth/request/user-password-reset.request.dto";
import type { UserPasswordResetResponseDto } from "../../dtos/auth/response/user-password-reset.response.dto";
import type { PasswordResetRequestDto } from "../../dtos/auth/request/password-reset.request.dto";
import type { PasswordResetSendEmailResponseDto } from "../../dtos/auth/response/password-reset-send-email.response.dto";
import type { FirstPasswordChangeRequestDto } from "../../dtos/auth/request/first-password-change.request.dto";
import type { FirstPasswordChangeResponseDto } from "../../dtos/auth/response/first-password-change.response.dto";

export const Signup = async (
  dto: CustomerSignUpRequestDto,
  profileImage: File | null
) : Promise<ResponseDto<CustomerSignUpResponseDto>> => {
  try {
    const formData = new FormData();
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const response = await axiosInstance.post(
      SIGNUP_URL,
      formData
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const login = async (
  dto: LoginRequestDto,
) : Promise<ResponseDto<LoginResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      LOGIN_URL,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const checkLoginIdDuplicate = async (
  username: string,
) : Promise<ResponseDto<UsernameCheckResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      EXIST_ID_URL, {
        params: { username }
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const checkEmailDuplicate = async (
  email: string,
) : Promise<ResponseDto<EmailCheckResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      EXIST_EMAIL_URL, {
        params: { email }
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const checkBusinessNumberDuplicate = async (
  businessNumber: string,
) : Promise<ResponseDto<BusinessNumberCheckResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      EXIST_BUSINESS_NUMBER_URL, {
        params: { businessNumber }
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const findCustomerLoginId = async (
  dto: CustomerLoginIdFindRequestDto,
) : Promise<ResponseDto<CustomerLoginIdFindResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CUSTOMER_FIND_ID_URL,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const findUserLoginId = async (
  dto: UserLoginIdFindRequestDto,
) : Promise<ResponseDto<UserLoginIdFindResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      USER_FIND_ID_URL,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const requestPasswordResetCustomer = async (
  dto: CustomerPasswordResetRequestDto,
) : Promise<ResponseDto<CustomerPasswordResetResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      CUSTOMER_RESET_PASSWORD_URL,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const requestPasswordResetUser = async (
  dto: UserPasswordResetRequestDto,
) : Promise<ResponseDto<UserPasswordResetResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      USER_RESET_PASSWORD_URL,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const resetPassword = async (
  dto: PasswordResetRequestDto,
  accessToken: string
) : Promise<ResponseDto<PasswordResetSendEmailResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      RESET_PASSWORD_URL,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const firstChange = async (
  dto: FirstPasswordChangeRequestDto,
) : Promise<ResponseDto<FirstPasswordChangeResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      MUST_CHANGE_PASSWORD_URL,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const verifyEmail = async (
  token: string,
) : Promise<ResponseDto<PasswordResetSendEmailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      VERIFY_EMAIL_URL, {
        params: { token }
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};