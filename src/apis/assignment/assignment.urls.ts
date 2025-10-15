import { API_BASE } from "../constants";

const ASSIGNMENT_MODULE_URL = `${API_BASE}/assignments`;

export const CREATE_ASSIGNMENT_URL = `${ASSIGNMENT_MODULE_URL}`;
export const UPDATE_ASSIGNMENT_URL = (assignmentId: number) => `${ASSIGNMENT_MODULE_URL}/${assignmentId}`;
export const UPDATE_ASSIGNMENT_STATUS_URL = (assignmentId: number) => `${ASSIGNMENT_MODULE_URL}/${assignmentId}/status`;
export const GET_ALL_ASSIGNMENT_URL = `${ASSIGNMENT_MODULE_URL}`;
export const GET_ASSIGNMENT_DETAIL_URL = (driverId: number) => `${ASSIGNMENT_MODULE_URL}/${driverId}`;
export const GET_ASSIGNMENT_URL = `${ASSIGNMENT_MODULE_URL}/me`;
export const RETIRED_DRIVER_URL = (dirverId: number) => `${ASSIGNMENT_MODULE_URL}/${dirverId}`;
