import axios, { AxiosRequestConfig } from "axios";
import { getPayloadAuthHeaders, getPublishableApiKey } from "../../data/cookies";

const baseURL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
const payloadBaseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const createApiClient = async () => {
  const publishableApiKey = await getPublishableApiKey();

  const api = axios.create({
    baseURL,
    headers: {
      "x-publishable-api-key": publishableApiKey,
    },
  });

  return api;
};

export const apiRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  const api = await createApiClient();
  const response = await api.request<T>(config);
  return response.data;
};

export const createAdminApiClient = async () => {
  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Basic ${process.env.NEXT_PUBLIC_MEDUSA_SECRET_API_KEY}`,
    },
  });

  return api;
};

export const adminApiRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  const api = await createAdminApiClient();
  const response = await api.request<T>(config);
  return response.data;
};

export const createPayloadApiClient = async () => {
  const authHeaders = await getPayloadAuthHeaders();
  const api = axios.create({
    baseURL,
    headers: {
      ...authHeaders,
    },
  });

  return api;
};
export const payloadApiRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  const api = await createPayloadApiClient();
  const response = await api.request<T>(config);
  return response.data;
};