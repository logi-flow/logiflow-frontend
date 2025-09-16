import { API_BASE } from "../constants";

const SCHEDULE_MODULE_URL = `${API_BASE}/schedules`;

export const UPDATE_SCHEDULE_URL = (scheduleId: number) => `${SCHEDULE_MODULE_URL}/${scheduleId}`;
export const GET_ALL_SCHEDULE_URL = `${SCHEDULE_MODULE_URL}`;
export const GET_SCHEDULE_DETAIL_URL = (scheduleId: number) => `${SCHEDULE_MODULE_URL}/${scheduleId}`;
export const GET_SCHEDULE_BY_DRIVER_URL = (driverId: number) => `${SCHEDULE_MODULE_URL}/drivers/${driverId}`;
export const GET_MY_SCHEDULE_URL = `${SCHEDULE_MODULE_URL}/me`;