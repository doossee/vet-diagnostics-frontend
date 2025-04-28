import { getCookie, setCookie } from 'cookies-next'

const APP_LOCALE = "APP_LOCALE"

export function useLanguage() {
    const getLocale = (getCookie(APP_LOCALE) || "uz") as "uz" | "ru"

    const setLocale = (data: string) => {
        setCookie(APP_LOCALE, data)
    }

    return {
        getLocale,
        setLocale,
    }
}