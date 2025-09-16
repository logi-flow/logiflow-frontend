import { API_BASE } from "../constants";

const PAYROLL_MODULE_URL = `${API_BASE}/payrolls`;

export const CREATE_DRIVER_ALLOWANCE_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/${payrollId}/allowances`;
export const GET_DRIVER_ALLOWANCE_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/${payrollId}/allowances`;
export const UPDATE_DRIVER_ALLOWANCE_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/${payrollId}/allowances`;
export const DELETE_DRIVER_ALLOWANCE_URL = (payrollId: number, allowanceId: number) => `${PAYROLL_MODULE_URL}/${payrollId}/allowances/${allowanceId}`;
export const GET_DRIVER_ALLOWANCE_UPDATE_LOGS_URL = `${PAYROLL_MODULE_URL}/allowances/logs/update`;