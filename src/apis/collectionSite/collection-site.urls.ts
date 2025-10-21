import { API_BASE } from "../constants";

const COLLECTION_SITE_MODULE_URL = `${API_BASE}/customers/me/collections`;

export const CREATE_COLLECTION_SITE_URL = `${COLLECTION_SITE_MODULE_URL}`;
export const UPDATE_COLLECTION_SITE_URL = (collectionSiteId: number) => `${COLLECTION_SITE_MODULE_URL}/${collectionSiteId}`;
export const GET_ALL_COLLECTION_SITE_URL = `${COLLECTION_SITE_MODULE_URL}`;
export const DELETE_COLLECTION_SITE_URL = (collectionSiteId: number) => `${COLLECTION_SITE_MODULE_URL}/${collectionSiteId}`;