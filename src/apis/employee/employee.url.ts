import { API_BASE } from "../constants";

export const EMPLOYEE_MODULE_URL = `${API_BASE}/employees`;

export const EMPLOYEE_MY_INFO_URL = `${EMPLOYEE_MODULE_URL}/me`;
export const EMPLOYEE_ID_URL = (employeeId: number) => `${EMPLOYEE_MODULE_URL}/${employeeId}`;
export const EMPLOYEE_STATUS_URL = (employeeId: number) => `${EMPLOYEE_MODULE_URL}/${employeeId}/status`;

export const GET_EMPLOYEE_UPDATE_LOGS_URL = `${EMPLOYEE_MODULE_URL}/logs/update`;
export const GET_EMPLOYEE_STATUS_LOGS_URL = `${EMPLOYEE_MODULE_URL}/logs/status`;