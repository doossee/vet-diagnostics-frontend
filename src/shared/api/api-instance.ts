import { isArray } from "lodash";
import { ALERT_MESSAGES } from "@/shared/constants";
import { createToast } from "@/shared/hooks/use-toast";
import { useLanguage } from "@/shared/hooks/use-language";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import Axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

const baseURL = '/api'
// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
// console.log(baseURL)

let isRefreshing = false;
let failedQueue: Array<(token: string) => void> = [];

const processQueue = (token: string | null, _: any = null) => {
  failedQueue.forEach((callback) => (token ? callback(token) : callback(null as any)));
  failedQueue = [];
};

export const apiInstance = Axios.create({
  baseURL
});

const refreshInstance = Axios.create({
  baseURL
});

apiInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // if ((config as any)._isRefreshRequest) return config;
    const { accessToken } = useAuthData();
    if (!config.headers) config.headers = {};

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config as any;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { getLocale } = useLanguage();

    if (response.statusText === "Created" && ["POST", "post"].includes(response.config.method!) && response.config.url !== "/auth/login") createToast(ALERT_MESSAGES.DATA_CREATED[getLocale], "SUCCESS");
    if (response.statusText === "OK" && ["DELETE", "delete"].includes(response.config.method!)) createToast(ALERT_MESSAGES.DATA_DELETED[getLocale], "SUCCESS");
    if (response.statusText === "OK" && ["PUT", "PATCH", "put", "patch"].includes(response.config.method!)) createToast(ALERT_MESSAGES.DATA_UPDATED[getLocale], "SUCCESS");
    return response;
  },
  async (error: AxiosError) => {
    const { refreshToken, setAuthData } = useAuthData();
    if (error.status! >= 400 && error.response?.status !== 401) {
      const { message } = error.response?.data as { message: string[] | string } ;

      if(isArray(message)) {
        message.map((m) => createToast(m, "WARNING"));
      } else {
        createToast((message as any)?.message ?? String(message), "WARNING")
      }
    }
    const originalRequest: any = error.config!;
    if (error.response?.status === 401 && !originalRequest?._retry) {

      if (!refreshToken || error.config?.url === "/auth/login") {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push((token: string) => {
            if (token) {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              resolve(apiInstance(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshInstance.post("/auth/refresh", {}, {
          headers: {
            "Authorization": refreshToken as string
          }
        });

        const newAccessToken = response.data.accessToken;
        setAuthData(response.data.accessToken, "ACCESS_TOKEN");
        setAuthData(response.data.refreshToken, "REFRESH_TOKEN");
        apiInstance.defaults.headers["Authorization"] = "Bearer " + newAccessToken;
        processQueue(newAccessToken);

        return apiInstance(originalRequest);
      } catch (refreshError) {
        processQueue(null, refreshError);

        setAuthData(null, "ACCESS_TOKEN");
        setAuthData(null, "REFRESH_TOKEN");
        setAuthData(null, "USER_DATA");

        location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export function createInstance<T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r?.data);
}

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
