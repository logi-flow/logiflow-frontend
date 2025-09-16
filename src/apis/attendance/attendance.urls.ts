import { API_BASE } from "../constants";

const ATTENDANCE_MODULE_URL = `${API_BASE}/attendances`;

export const CHECK_IN_ATTENDANCE_URL = `${ATTENDANCE_MODULE_URL}/check-in`;
export const CHECK_OUT_ATTENDANCE_URL = `${ATTENDANCE_MODULE_URL}/check-out`;
export const GET_ALL_ATTENDANCE_URL = `${ATTENDANCE_MODULE_URL}`;
export const GET_ATTENDANCE_DETAIL_URL = (attendanceId: number) => `${ATTENDANCE_MODULE_URL}/${attendanceId}`;
export const GET_MY_ATTENDANCE_URL = `${ATTENDANCE_MODULE_URL}/me`;
export const GET_ALL_MY_ATTENDANCE_URL = `${ATTENDANCE_MODULE_URL}/me/list`;