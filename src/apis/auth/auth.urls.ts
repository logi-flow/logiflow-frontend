import { API_BASE } from "../constants";

const AUTH_MODULE_URL = `${API_BASE}/auth`;

export const SIGNUP_API = `${AUTH_MODULE_URL}/signup`;
export const LOGIN_API = `${AUTH_MODULE_URL}/login`;
export const EXIST_ID_API = `${AUTH_MODULE_URL}/login-id/exist`;
export const EXIST_EMAIL_API = `${AUTH_MODULE_URL}/email/exist`;
export const EXIST_BUSINESS_NUMBER_API = `${AUTH_MODULE_URL}/business-number/exist`;
export const CUSTOMER_FIND_ID_API = `${AUTH_MODULE_URL}/login-id/find/customers`;
export const USER_FIND_ID_API = `${AUTH_MODULE_URL}/login-id/find/users`;
export const CUSTOMER_RESET_PASSWORD_API = `${AUTH_MODULE_URL}/password/reset/customers`;
export const USER_RESET_PASSWORD_API = `${AUTH_MODULE_URL}/password/reset/users`;
export const RESET_PASSWORD_API = `${AUTH_MODULE_URL}/password/reset`;
export const MUST_CHANGE_PASSWORD_API = `${AUTH_MODULE_URL}/password/first-change`;
export const VERIFY_EMAIL_API = `${AUTH_MODULE_URL}/email/verify`;