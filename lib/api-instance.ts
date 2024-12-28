import { ALERT_MESSAGES } from '~/constants'
import { createToast } from '~/hooks/use-toast'
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
    (response: AxiosResponse) => {
        if(response.statusText === "Created" && ['POST', 'post'].includes(response.config.method!) && response.config.url !== '/auth/login')
            createToast(ALERT_MESSAGES.DATA_CREATED, "SUCCESS")
        if(response.statusText === "OK" && ['DELETE', 'delete'].includes(response.config.method!))
            createToast(ALERT_MESSAGES.DATA_DELETED, "SUCCESS")
        if(response.statusText === "OK" && ['PUT', 'PATCH', 'put', 'patch'].includes(response.config.method!))
            createToast(ALERT_MESSAGES.DATA_UPDATED, "SUCCESS")
        return response
    },
    async (error: AxiosError) => {
        console.log(error)
        if(error.status === 400) {
            const { message } = error.response?.data as { message: string[] }

            message.map(m => createToast(m, 'WARNING'))
        }
        const originalRequest: any = error.config!
        if (error.response?.status === 401 && !originalRequest?._retry) {
            if (!refreshToken || error.config?.url === '/auth/login') {
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