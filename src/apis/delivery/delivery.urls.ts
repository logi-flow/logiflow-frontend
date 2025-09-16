import { API_BASE } from "../constants";

const DELIVERY_MODULE_URL = `${API_BASE}/deliveries`;

export const CREATE_DELIVERY_URL = `${DELIVERY_MODULE_URL}`;
export const GET_ALL_DELIVERY_URL = `${DELIVERY_MODULE_URL}`;
export const GET_DELIVERY_DETAIL_URL = (deliveryId: number) => `${DELIVERY_MODULE_URL}/${deliveryId}`;
export const GET_MY_DELIVERY_URL = `${DELIVERY_MODULE_URL}/me`;
export const UPDATE_DELIVERY_IS_HIDDEN_URL = (deliveryId: number) => `${DELIVERY_MODULE_URL}/${deliveryId}/isHidden`;
export const UPDATE_DELIVERY_URL = (deliveryId: number) => `${DELIVERY_MODULE_URL}/${deliveryId}`;
export const UPDATE_DELIVERY_STATUS_URL = (deliveryId: number) => `${DELIVERY_MODULE_URL}/${deliveryId}/status`;
export const CANCEL_DELIVERY_URL = (deliveryId: number) => `${DELIVERY_MODULE_URL}/${deliveryId}/cancel`;
export const DELETE_DELIVERY_URL = (deliveryId: number) => `${DELIVERY_MODULE_URL}/${deliveryId}`;
export const GET_ALL_WAITING_DELIVERY_URL = `${DELIVERY_MODULE_URL}/waiting`;
export const UPLOAD_DELIVERY_URL = `${DELIVERY_MODULE_URL}/upload`;

export const GET_DELIVERY_UPDATE_LOGS_URL = `${DELIVERY_MODULE_URL}/logs/update`;
export const GET_DELIVERY_STATUS_LOGS_URL = `${DELIVERY_MODULE_URL}/logs/status`;