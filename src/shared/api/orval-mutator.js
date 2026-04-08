import { apiInstance } from "./api-instance.ts";

export function createInstance(config, options) {
  return apiInstance({
    ...config,
    ...options,
  }).then((response) => response?.data);
}
