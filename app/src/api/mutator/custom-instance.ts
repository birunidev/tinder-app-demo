import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { type AxiosRequestConfig } from "axios";
import Constants from "expo-constants";

const getApiBaseUrl = () => {
  const fromConstants = Constants.expoConfig?.extra?.API_BASE_URL;
  if (fromConstants) {
    return fromConstants;
  }
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL;
  }
  return "http://localhost:8000/api/v1";
};

export const AXIOS_INSTANCE = axios.create({
  baseURL: getApiBaseUrl(),
});

AXIOS_INSTANCE.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

interface AdditionalAxiosRequestConfig extends AxiosRequestConfig {
  disableNotifyError?: boolean;
}

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AdditionalAxiosRequestConfig
): Promise<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  const source = axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  })
    .then((response) => {
      const data = response?.data;

      return data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};
