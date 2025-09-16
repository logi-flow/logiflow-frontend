import { API_BASE } from "../constants";

const PAYROLL_MODULE_URL = `${API_BASE}/payrolls`;

export const CREATE_DRIVER_PAYROLL_URL = `${PAYROLL_MODULE_URL}`;
export const GET_ALL_DRIVER_PAYROLL_URL = `${PAYROLL_MODULE_URL}`;
export const GET_DRIVER_PAYROLL_DETAIL_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/${payrollId}`;
export const GET_ALL_MY_PAYROLL_URL = `${PAYROLL_MODULE_URL}/me`;
export const GET_MY_PAYROLL_DETAIL_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/me/${payrollId}`;
export const UPDATE_DRIVER_PAYROLL_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/${payrollId}`;
export const UPDATE_DRIVER_PAYROLL_STATUS_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/${payrollId}/status`;
export const DELETE_DRIVER_PAYROLL_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/${payrollId}`;
export const GET_DRIVER_PAYROLL_UPDATE_LOGS_URL = `${PAYROLL_MODULE_URL}/logs/update`;
export const GET_DRIVER_PAYROLL_STATUS_LOGS_URL = `${PAYROLL_MODULE_URL}/logs/status`;