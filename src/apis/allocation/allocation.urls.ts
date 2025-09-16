import { API_BASE } from "../constants";

const ALLOCATION_MODULE_URL = `${API_BASE}/allocations`;

export const CREATE_ALLOCATION_URL = `${ALLOCATION_MODULE_URL}`;
export const UPDATE_ALLOCATION_URL = (allocationId: number) => `${ALLOCATION_MODULE_URL}/${allocationId}`;
export const UPDATE_ALLOCATION_STATUS_URL = (allocationId: number) => `${ALLOCATION_MODULE_URL}/${allocationId}/status`;

export const GET_ALLOCATION_UPDATE_LOGS_URL = `${ALLOCATION_MODULE_URL}/logs/update`;
export const GET_ALLOCATION_STATUS_LOGS_URL = `${ALLOCATION_MODULE_URL}/logs/status`;