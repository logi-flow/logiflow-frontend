import { API_BASE } from "../constants";

const RETURN_DELIVERY_MODULE_URL = `${API_BASE}/return-deliveries`;

export const CREATE_RETURN_DELIVERY_URL = (deliveryId: number) =>
  `${RETURN_DELIVERY_MODULE_URL}/${deliveryId}`;

export const GET_ALL_RETURN_DELIVERY_URL = `${RETURN_DELIVERY_MODULE_URL}`;

export const GET_RETURN_DELIVERY_DETAIL_URL = (returnDeliveryId: number) =>
  `${RETURN_DELIVERY_MODULE_URL}/${returnDeliveryId}`;

export const GET_MY_RETURN_DELIVERY_URL = `${RETURN_DELIVERY_MODULE_URL}/me`;

export const GET_ALL_WAITING_RETURN_DELIVERY_URL = `${RETURN_DELIVERY_MODULE_URL}/waiting`;

export const UPDATE_RETURN_DELIVERY_URL = (returnDeliveryId: number) =>
  `${RETURN_DELIVERY_MODULE_URL}/${returnDeliveryId}`;

export const UPDATE_RETURN_DELIVERY_STATUS_URL = (returnDeliveryId: number) =>
  `${RETURN_DELIVERY_MODULE_URL}/${returnDeliveryId}/status`;

export const UPDATE_RETURN_DELIVERY_STATUS_CANCEL_URL = (
  returnDeliveryId: number
) => `${RETURN_DELIVERY_MODULE_URL}/${returnDeliveryId}/cancel`;

export const UPDATE_RETURN_DELIVERY_IS_HIDDEN_URL = (returnDeliveryId: number) =>
  `${RETURN_DELIVERY_MODULE_URL}/${returnDeliveryId}/is-hidden`;

export const DELETE_RETURN_DELIVERY_URL = (returnDeliveryId: number) =>
  `${RETURN_DELIVERY_MODULE_URL}/${returnDeliveryId}`;
