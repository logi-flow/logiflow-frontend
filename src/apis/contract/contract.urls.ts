import { API_BASE } from "../constants";

const CONTRACT_MODULE_URL = `${API_BASE}/contracts`;

export const CREATE_CONTRACT_URL = `${CONTRACT_MODULE_URL}`;
export const UPDATE_CONTRACT_URL = (contractId: number) => `${CONTRACT_MODULE_URL}/${contractId}`;
export const UPDATE_CONTRACT_STATUS_URL = (contractId: number) => `${CONTRACT_MODULE_URL}/${contractId}/status`;
export const GET_ALL_CONTRACT_URL = `${CONTRACT_MODULE_URL}`;
export const GET_CONTRACT_DETAIL_URL = (contractId: number) => `${CONTRACT_MODULE_URL}/${contractId}`;
export const GET_MY_CONTRACT_URL = `${CONTRACT_MODULE_URL}/me`;
export const DELETE_CONTRACT_URL = (contractId: number) => `${CONTRACT_MODULE_URL}/${contractId}`;

export const GET_CONTRACT_UPDATE_LOGS_URL = `${CONTRACT_MODULE_URL}/logs/update`;
export const GET_CONTRACT_STATUS_LOGS_URL = `${CONTRACT_MODULE_URL}/logs/status`;