import { API_BASE } from "../constants";

const DEDUCTION_MODULE_URL = `${API_BASE}/deduction-types`;

export const CREATE_DEDUCTION_TYPE_URL = `${DEDUCTION_MODULE_URL}`;
export const GET_ALL_DEDUCTION_TYPE_URL = `${DEDUCTION_MODULE_URL}`;
export const GET_DEDUCTION_TYPE_DETAIL_URL = (deductionTypeId: number) => `${DEDUCTION_MODULE_URL}/${deductionTypeId}`;
export const UPDATE_DEDUCTION_TYPE_URL = (deductionTypeId: number) => `${DEDUCTION_MODULE_URL}/${deductionTypeId}`;
export const DELETE_DEDUCTION_TYPE_URL = (deductionTypeId: number) => `${DEDUCTION_MODULE_URL}/${deductionTypeId}`;
export const GET_DEDUCTION_TYPE_UPDATE_LOGS_URL = `${DEDUCTION_MODULE_URL}/logs/update`;