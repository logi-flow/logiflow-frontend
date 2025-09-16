import { API_BASE } from "../constants";

const PAYROLL_MODULE_URL = `${API_BASE}/payrolls`;

export const CREATE_DRIVER_DEDUCTION_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/${payrollId}/deductions`;
export const GET_DRIVER_DEDUCTION_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/${payrollId}/deductions`;
export const UPDATE_DRIVER_DEDUCTION_URL = (payrollId: number) => `${PAYROLL_MODULE_URL}/${payrollId}/deductions`;
export const DELETE_DRIVER_DEDUCTION_URL = (payrollId: number, deductionId: number) => `${PAYROLL_MODULE_URL}/${payrollId}/deductions/${deductionId}`;
export const GET_DRIVER_DEDUCTION_UPDATE_LOGS_URL = `${PAYROLL_MODULE_URL}/deductions/logs/update`;