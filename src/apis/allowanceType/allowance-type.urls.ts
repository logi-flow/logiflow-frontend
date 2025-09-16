import { API_BASE } from "../constants";

const ALLOWANCE_MODULE_URL = `${API_BASE}/allowance-types`;

export const CREATE_ALLOWANCE_TYPE_URL = `${ALLOWANCE_MODULE_URL}`;
export const GET_ALL_ALLOWANCE_TYPE_URL = `${ALLOWANCE_MODULE_URL}`;
export const GET_ALLOWANCE_TYPE_DETAIL_URL = (allowanceTypeId: number) => `${ALLOWANCE_MODULE_URL}/${allowanceTypeId}`;
export const UPDATE_ALLOWANCE_TYPE_URL = (allowanceTypeId: number) => `${ALLOWANCE_MODULE_URL}/${allowanceTypeId}`;
export const DELETE_ALLOWANCE_TYPE_URL = (allowanceTypeId: number) => `${ALLOWANCE_MODULE_URL}/${allowanceTypeId}`;
export const GET_ALLOWANCE_TYPE_UPDATE_LOGS_URL = `${ALLOWANCE_MODULE_URL}/logs/update`;