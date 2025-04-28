import { useLocale, useTranslations } from "next-intl"

export function useI18n() {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    return { t, locale }
}