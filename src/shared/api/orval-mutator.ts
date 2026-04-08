import type { AxiosError, AxiosRequestConfig } from "axios";

import { apiInstance } from "./api-instance";

export function createInstance<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return apiInstance({
    ...config,
    ...options,
  }).then((response) => response?.data);
}

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
