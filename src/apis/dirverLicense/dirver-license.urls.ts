import { API_BASE } from "../constants";

const DRIVER_LICENSE_MODULE_URL = `${API_BASE}/drivers`;

export const CREATE_DRIVER_LICENSE_URL = (driverId: number) => `${DRIVER_LICENSE_MODULE_URL}/${driverId}/licenses`;
export const UPDATE_DRIVER_LICENSE_URL = (driverId: number, licenseId: number) => `${DRIVER_LICENSE_MODULE_URL}/${driverId}/licenses/${licenseId}`;
