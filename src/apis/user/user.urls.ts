import { API_BASE } from "../constants";

export const USER_MODULE_URL = `${API_BASE}/users`;

export const USER_ID_URL = (userId: number) => `${USER_MODULE_URL}/${userId}`;
export const USER_STATUS_URL = (userId: number) => `${USER_MODULE_URL}/${userId}/status`;
export const USER_ROLE_URL = (userId: number) => `${USER_MODULE_URL}/${userId}/roles`;

export const GET_USER_STATUS_LOGS_URL = `${USER_MODULE_URL}/logs/status`;
export const GET_USER_ROLE_LOGS_URL = `${USER_MODULE_URL}/logs/roles`;