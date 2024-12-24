import { useAuthData } from '~/hooks/use-auth-data'
import Axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

const baseURL = '/api'
const { accessToken, refreshToken, setAuthData } = useAuthData()

let isRefreshing = false
let failedQueue: Array<(token: string) => void> = []

const processQueue = (token: string | null, error: any = null) => {
    failedQueue.forEach((callback) => (token ? callback(token) : callback(null as any)))
    failedQueue = []
}

export const apiInstance = Axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Authorization":  accessToken ? "Bearer " + accessToken : ""
    },
})

apiInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config!
        if (error.response?.status === 401 && !originalRequest?._retry) {
            if (!refreshToken) {
                return Promise.reject(error)
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push((token: string) => {
                        if (token) {
                            originalRequest.headers["Authorization"] = "Bearer " + token
                            resolve(apiInstance(originalRequest))
                        } else {
                            reject(error)
                        }
                    })
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const response = await Axios.post(baseURL+'/auth/refresh', {
                    refreshToken,
                })

                const newAccessToken = response.data.accessToken
                setAuthData(response.data.accessToken, 'ACCESS_TOKEN')
                setAuthData(response.data.refreshToken, 'REFRESH_TOKEN')
                apiInstance.defaults.headers["Authorization"] = "Bearer " + newAccessToken
                processQueue(newAccessToken)

                return apiInstance(originalRequest)
            } catch (refreshError) {
                processQueue(null, refreshError)
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export const createInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    return apiInstance({
        ...config,
        ...options
    }).then(r => r?.data)
}

export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData