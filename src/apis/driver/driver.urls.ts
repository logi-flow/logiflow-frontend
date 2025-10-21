import { API_BASE } from "../constants";

const DRIVER_MODULE_URL = `${API_BASE}/drivers`;

export const CREATE_DRIVER_URL = `${DRIVER_MODULE_URL}`;
export const UPDATE_DRIVER_URL = `${DRIVER_MODULE_URL}/me`;
export const UPDATE_DRIVER_BY_ADMIN_URL = (driverId: number) => `${DRIVER_MODULE_URL}/${driverId}`;
export const UPDATE_DRIVER_PAY_URL = (driverId: number) => `${DRIVER_MODULE_URL}/${driverId}/pay`;
export const UPDATE_DRIVER_STATUS_URL = (driverId: number) => `${DRIVER_MODULE_URL}/${driverId}/status`;
export const GET_ALL_DRIVER_URL = `${DRIVER_MODULE_URL}`;
export const GET_DRIVER_DETAIL_URL = (driverId: number) => `${DRIVER_MODULE_URL}/${driverId}`;
export const GET_MY_INFO_URL = `${DRIVER_MODULE_URL}/me`;
export const RETIRED_DRIVER_URL = (dirverId: number) => `${DRIVER_MODULE_URL}/${dirverId}`;
