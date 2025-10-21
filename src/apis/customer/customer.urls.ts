import { API_BASE } from "../constants";

export const CUSTOMER_MODULE_URL = `${API_BASE}/customers`;

export const CUSTOMER_MY_INFO_URL = `${CUSTOMER_MODULE_URL}/me`;
export const CUSTOMER_ID_URL = (customerId: number) => `${CUSTOMER_MODULE_URL}/${customerId}`;
export const CUSTOMER_STATUS_URL = (customerId: number) => `${CUSTOMER_MODULE_URL}/${customerId}/status`;

export const GET_CUSTOMER_UPDATE_LOGS_URL = `${CUSTOMER_MODULE_URL}/logs/update`;
export const GET_CUSTOMER_STATUS_LOGS_URL = `${CUSTOMER_MODULE_URL}/logs/status`;