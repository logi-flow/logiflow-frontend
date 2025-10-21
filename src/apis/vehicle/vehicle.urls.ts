import { API_BASE } from "../constants";

const VEHICLE_MODULE_URL = `${API_BASE}/vehicles`;

export const CREATE_VEHICLE_URL = `${VEHICLE_MODULE_URL}`;
export const UPDATE_VEHICLE_URL = (vehicleId: number) => `${VEHICLE_MODULE_URL}/${vehicleId}`;
export const UPDATE_VEHICLE_STATUS_URL = (vehicleId: number) => `${VEHICLE_MODULE_URL}/${vehicleId}/status`;
export const GET_ALL_VEHICLE_URL = `${VEHICLE_MODULE_URL}`;
export const GET_VEHICLE_DETAIL_URL = (vehicleId: number) => `${VEHICLE_MODULE_URL}/${vehicleId}`;
export const DELETE_VEHICLE_URL = (vehicleId: number) => `${VEHICLE_MODULE_URL}/${vehicleId}`;


