import { LanguageLocales } from "../types";
import { useLocale, useTranslations } from "next-intl";

export function useI18n() {
  const t = useTranslations();
  const locale = useLocale() as LanguageLocales;

  return { t, locale };
}
