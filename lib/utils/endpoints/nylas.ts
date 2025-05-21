import axios, { AxiosRequestConfig } from "axios";

export const createNylasClient = async () => {
  const api = axios.create({
    baseURL: process.env.NYLAS_API_URI,
    headers: {
      Authorization: `Bearer ${process.env.NYLAS_API_KEY}`,
    },
  });

  return api;
};

export const nylasRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  const api = await createNylasClient();
  const response = await api.request<T>(config);
  return response.data;
};
