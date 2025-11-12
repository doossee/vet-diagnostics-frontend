import { LanguageLocales } from "../types";
import uzJson from "@/shared/messages/uz.json";
import { useLocale, useTranslations } from "next-intl";

export type Messages = typeof uzJson;
// TODO: type i18n
export function useI18n() {
  const t = useTranslations<keyof Messages>();
  const locale = useLocale() as LanguageLocales;

  return { t, locale };
}
